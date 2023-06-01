import express from "express";
import {
  getPost,
  getPostsFromCourse,
  getPostsFromUser,
  pinPost,
  unpinPost,
  updatePost,
} from "../db/posts.js";
import { BadRequestError, ForbiddenError } from "../util/Errors.js";
import { Posts } from "../db/schemas/models.js";
import { ensureLoggedIn, ensureTeacher } from "../middleware/authToken.js";
import { getCourse } from "../db/courses.js";
import { ADMIN, STUDENT, TEACHER } from "../util/roles.js";
import { getUser } from "../db/users.js";

export const postsRouter = express.Router();
postsRouter.use(ensureLoggedIn);
const canPost = async ({ role, _id }, cid) => {
  const course = await getCourse(cid);
  if (role !== ADMIN && !course.hasMember(_id)) throw new ForbiddenError();
};

postsRouter.get(
  "/:_id",
  async ({ params: { _id }, query: { course, user } }, res, next) => {
    try {
      const post = getPost(_id, { course, user });
      const { role, _id: userid } = res.locals.user;
      const [_p] = await Posts.find({ _id }).populate("course").exec();
      const _course = await getCourse(_p.course._id);

      if (role !== ADMIN && !_course.hasMember(userid))
        throw new ForbiddenError();

      res.json(await post);
    } catch (e) {
      next(e);
    }
  }
);

function getSort(sort) {
  if (sort) {
    const keys = Object.keys(sort);
    const [key] = keys;
    let value;
    if (key) value = parseInt(sort[key]);
    sort = { [key]: value };
  }
  return sort;
}

postsRouter.get('/users/:username', async ({ params: { username } }, res, next) => {
    try {
        const results = await getPostsFromUser(username);
        return res.json(results);
    } catch (e) {
        next(e);
    }
})

postsRouter.get(
  "/courses/:course",
  async ({ params: { course }, query: { sort } }, res, next) => {
    try {
      await canPost(res.locals.user,course)

      sort = getSort(sort);

      const results = await getPostsFromCourse(course, sort);
      return res.json(results);
    } catch (e) {
      next(e);
    }
  } /*ensureEnrolledOrProf*/
);

postsRouter.post("/", async ({ body }, res, next) => {
  try {
    const { course: cid } = body;
    await canPost(res.locals.user, cid);
    const { username } = res.locals.user;
    const post = await Posts.create({
      ...body,
      username,
      pinned: false,
      postDate: new Date(),
    });
    res.status(201).json(post);
  } catch (err) {
    return next(err);
  }
});

postsRouter.put(
  "/:_id",
  async ({ body: { title, content }, params: { _id } }, res, next) => {
    try {
        console.log(_id, content)
      if (!content) throw new BadRequestError("Body has no content");
      const user = await getUser(res.locals.user.username);
      if (!(await user.ownsPost(_id))) throw new ForbiddenError();
      await updatePost(_id, { title, content });
      res.json({ message: "Updated!" });
    } catch (e) {
      return next(e);
    }
  }
);

postsRouter.put(
  "/:_id/pin",
  ensureTeacher,
  async ({ params: { _id } }, res, next) => {
    try {
      const post = await getPost(_id, { course: true });
      if (!post.course.hasMember(res.locals.user._id))
        throw new ForbiddenError();
      await pinPost(_id);
      res.json({ message: "pinned!" });
    } catch (e) {
      next(e);
    }
  }
);
postsRouter.put(
  "/:_id/unpin",
  ensureTeacher,
  async ({ params: { _id } }, res, next) => {
    try {
      const post = await getPost(_id, { course: true });
      if (!post.course.hasMember(res.locals.user._id))
        throw new ForbiddenError();
      await unpinPost(_id);
      res.json({ message: "unpinned!" });
    } catch (e) {
      next(e);
    }
  }
);

postsRouter.delete("/:_id", async ({ params: { _id } }, res, next) => {
  try {
    const { username, role, _id: user_id } = res.locals.user;
    if (role !== ADMIN) {
      const userDeleting = await getUser(username);
      if (role === STUDENT && !userDeleting.ownsPost(_id)) {
        throw new ForbiddenError("cannot delete another users post");
      } else if (role === TEACHER) {
        const post = await getPost(_id, { course: true });
        if (!post.course.hasMember(user_id)) {
          throw new ForbiddenError(
            "teacher can only delete in their own course"
          );
        }
      }
    }
    const { ...rest } = await Posts.findOneAndDelete({ _id }).exec();
    res.json({ deleted: "true" });
  } catch (e) {
    next(e);
  }
});
