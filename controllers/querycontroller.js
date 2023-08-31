const Query = require('../models/query')
const nodemailer = require('nodemailer')
exports.add = (req, res) => {
  //  console.log(req.body)
  //     const {email,query}=req.body
  //     var date=new Date()
  //     const todaydate=date.getDate()
  //     const currenthour=date.getHours()
  //     const currentminute=date.getMinutes()
  //     const currentsec=date.getSeconds()
  //     const record= new Query({email:email,query:query,postedDate:date})
  //    record.save()
  // console.log(record)
  exports.add = (req, res) => {
    const { email, query } = req.body;
    const currentDate = moment().format('YYYY-MM-DD');
    const currentTime = moment().format('hh:mm:ss A');
    const dateTime = `${currentDate} ${currentTime}`;

    const record = new Query({ email: email, query: query, postedDateTime: dateTime });

    record.save((err, savedRecord) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to save query' });
      }

      console.log(savedRecord);
      return res.status(200).json({ message: 'Query added successfully' });
    });
  };
}
exports.show = async (req, res) => {
  const record = await Query.find().sort({ postedDate: -1 })
  const totalquery = await Query.count()
  const waitingforreply = await Query.count({ status: 'waiting for reply' })
  const replied = await Query.count({ status: 'Replied' })
  res.render('admin/query.ejs', { record, totalquery, waitingforreply, replied })
}
exports.emailform = async (req, res) => {
  // console.log(req.params.id)
  const id = req.params.id
  const record = await Query.findById(id)
  res.render('admin/queryform.ejs', { record })
}
exports.emailsend = async (req, res) => {
  // console.log(req.params.id)
  // res.send("Succesfuly Delivered ")
  const id = req.params.id
  const { emailto, emailfrom, subject, body } = req.body
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'smsyed123786@gmail.com', // generated ethereal user
      pass: 'yvpfsmnzwjwyycbx', // generated ethereal password
    },
  });
  console.log("connected to smtp Server")
  let info = await transporter.sendMail({
    from: emailfrom, // sender address
    to: emailto, // list of receivers
    subject: subject, // Subject line
    text: body, // plain text body
    // html: "<b>Hello world?</b>", // html body
    // attachments:[{
    //     path:filepath
    // }]
  });
  console.log('Email Sent Successfully')
  const newdateadd = new Date()
  await Query.findByIdAndUpdate(id, { status: 'Replied', postedDate: newdateadd })

  // const record= new Query({email:email,query:query,postedDate:newdateadd})
  res.redirect('/admin/query')
}
exports.delete = async (req, res) => {
  // console.log(req.params.id)
  const id = req.params.id
  const record = await Query.findByIdAndDelete(id)
  res.redirect('/admin/query')
}
exports.search = async (req, res) => {
  // console.log(req.body)
  const { status } = req.body
  const record = await Query.find({ status: status })
  const totalquery = await Query.count()
  const waitingforreply = await Query.count({ status: 'waiting for reply' })
  const replied = await Query.count({ status: 'Replied' })

  res.render('admin/query.ejs', { record, totalquery, waitingforreply, replied })
}
