import mongoose from "mongoose";
import express from "express";
/**
 * calls toJSON on an object or all objects in an array
 * used for filtering out mongoose query data from results
 * @param json object to be jsonified
 * @returns just the toJSON content of the object
 */




export function jsonify(json){
    const jstringify=j=>
    {
        return JSON.parse(
            JSON.stringify(
                'toJSON' in j
                    ? j.toJSON()
                    : j
            )

        )
    }
    if(Array.isArray(json))return json.map(jstringify)
    return jstringify(json)
}
