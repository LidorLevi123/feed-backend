import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'

import mongodb from 'mongodb'

const { ObjectId } = mongodb

async function query(filterBy = { email: '' }) {
    try {
        const criteria = {
            'by.email': { $regex: filterBy.email, $options: 'i' }
        }
        const collection = await dbService.getCollection('comment')
        var commentCursor = await collection.find(criteria)

        const comments = await commentCursor.toArray()
        return comments
    } catch (err) {
        logger.error('cannot find comments', err)
        throw err
    }
}

async function getById(commentId) {
    try {
        const collection = await dbService.getCollection('comment')
        const comment = collection.findOne({ _id: ObjectId(commentId) })
        return comment
    } catch (err) {
        logger.error(`while finding comment ${commentId}`, err)
        throw err
    }
}

async function remove(commentId) {
    try {
        const collection = await dbService.getCollection('comment')
        await collection.deleteOne({ _id: ObjectId(commentId) })
        return commentId
    } catch (err) {
        logger.error(`cannot remove comment ${commentId}`, err)
        throw err
    }
}

async function add(comment) {
    try {
        const collection = await dbService.getCollection('comment')
        await collection.insertOne(comment)
        return comment
    } catch (err) {
        logger.error('cannot insert comment', err)
        throw err
    }
}

export const commentService = {
    remove,
    query,
    getById,
    add,
}
