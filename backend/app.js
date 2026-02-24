import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes

/* app.use('/api/posts', posts);
app.use('/api/reply', aiReply); */