const express = require('express')
const app = express()
var CronJob = require('node-cron');

app.get('/', (req, res) => {

    CronJob.schedule('* * * * *', function(){
        console.log('running a task every minute');
      });
      res.send('ok')
})

app.listen(3000, () => {
    console.log('Server started.')
})


