'use strict';

const db = require('../models');


exports.getAll = async ctx => {
  try {
    const msg = await db.Message.findAll();
    console.log(msg);
    ctx.body = msg;
  } catch (err) {
    ctx.status = 500;
    // further handle the error on the BE
  }
};

exports.post = async ctx => {
  const msg = ctx.request.body;
  try {
    ctx.body = await db.Message.create({
      authorId: msg.authorId,
      content: msg.content
    });
    ctx.status = 201;
  }
  catch (err) {
    // further handle the error on the BE
    ctx.status = 400;
  }
};

