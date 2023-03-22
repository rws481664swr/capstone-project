import * as data from '../../common/seed-test-db.js'
import {Courses, Posts, Users} from "../../../db/schemas/models.js";
import {newUser} from "../../../db/schemas/users.js";
import {newCourse} from "../../../db/schemas/courses.js";
import {newPost} from "../../../db/schemas/posts.js";
import {should} from "chai";
import common,{doAfterEach, doAfterAll, doBeforeAll, doBeforeEach, c1} from "../../common/seed-test-db.js";
import {getCourse} from "../../../db/courses.js";

should()
