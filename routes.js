const express = require('express');
const ExpressError = require('./error');

const app = express();

app.get('/mean', (req, res, next) => {
    if(!req.query.nums){
        const err = new ExpressError('Query of nums is expected', 400);
        return next(err);
    }

    const nums = req.query.nums.split(',')
        .map(x => Number(x));
    console.log('here');

    const mean = nums.reduce((total, current) => total + current) / nums.length;

    return res.json({
        operation: 'mean',
        value: mean
    });
})

app.get('/median', (req, res, next) => {
    if(!req.query.nums){
        const err = new ExpressError('Query of nums is expected', 400);
        return next(err);
    }

    const nums = req.query.nums.split(',')
        .map(x => Number(x));

    const sort = nums.sort((a, b) => a - b);
    const middle = Math.floor(sort.length / 2);

    if (sort.length % 2 === 0) {
        return (sort[middle - 1] + sort[middle]) / 2;
    }

    return res.json({
        operation: 'mean',
        value: sort[middle]
    });
})

app.get('/mode', (req, res, next) => {
    if(!req.query.nums){
        const err = new ExpressError('Query of nums is expected', 400);
        return next(err);
    }

    const nums = req.query.nums.split(',')
        .map(x => Number(x));

        const mode = {};
        let max = 0
        let count = 0;
      
        for(let i = 0; i < nums.length; i++) {
          const item = nums[i];
          
          if(mode[item]) {
            mode[item]++;
          } 
          else {
            mode[item] = 1;
          }
          
          if(count < mode[item]) {
            max = item;
            count = mode[item];
          }
        }

    return res.json({
        operation: 'mean',
        value: max
    });
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({
        error: err
    })

})

app.listen(3000, () => {
    console.log('server listening');
})