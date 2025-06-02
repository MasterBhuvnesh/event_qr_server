import express from "express";
import { generateQR } from "../utils/generateQR";
import { htmlToPng } from "../utils/htmlToImage";

const router = express.Router();

router.post("/ticket", async (req, res) => {
  try {
    const { data } = req.body;
    const qrData = {
      qrId: data.registration.id,
      qrCode: data.registration.code,
    };

    const qrImage = await generateQR(qrData);

    const html = `
      <html>
        <head>
          <style>
          @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Sigmar&display=swap');
body {
    font-family: 'Poppins', sans-serif;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .ticket {
    display: flex;
    width: 700px;
    height: 300px;
   background-size: cover;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    overflow: hidden;
    margin: 20px;
  }
  
  .left {
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }
  
  .event {
    display: flex;
    flex-direction: column;
  }
  
  .title {
    font-size: 42px;
    font-weight: bold;
    font-family: 'Poppins';
    margin-bottom: 10px;
    margin-left: 20px;
    margin-top: 20px;
    color: #fff;
  }
  
  .description {
    font-size: 12px;
    font-family: 'Poppins';
    margin-left: 20px;
    margin-bottom: 10px;
    color: #fff;
    margin-right: 20px;
    max-width: 300px;
    text-align: center;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
   
  }
  
  .date {
    background: #fff;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .datetime {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 20px;
    margin-right: 20px;
  }
  .datetime p {
    font-size: 12px;
    font-family: 'Poppins';
    margin-left: 20px;
    color: #000;
    margin-right: 20px;
    text-align: center;
   
  }
.category {
    text-align: right;
    background: #000;
    padding: 5px;
    border-radius: 5px;
  }
  
  .category span {
    font-size: 12px;
    padding: 5px 10px 5px 10px;
    color: #fff;
  }

  
  .right {
    flex: 1;
    background: #111;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    /* align-items: center; */
    padding: 10px;
  }
  
  .barcode {
    width: 80%;
    height: 60px;
    background: repeating-linear-gradient(
      to right,
      #fff,
      #fff 2px,
      #000 2px,
      #000 4px
    );
    margin: 10px 0;
  }
  
  .qr-info {
    display: flex;
  /* justify-content: space-between; */
   flex-direction: row;
  }
  .qr-mini {
    width: 100px;
    height: 100px;
    background: #fff;
    border-radius: 5px;
    margin: 5px 5px 5px 5px;
    align-items: center;
    justify-content: center;
  }
  .qr-mini img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .qr-code {
    display: flex;
     align-items: center; 
     justify-content: center; 
     margin: 5px 5px 5px 5px;
    padding: 0;
    max-width: fit-content;
    width: 15px;
    height: 100px;
    
  }
  .qr-code p {
    transform: rotate(90deg);
    font-size: 12px;
    font-family: 'Poppins';
    color: #fff;
    margin: 0;
  }
   .details {
    display: flex;
    flex-direction: column;
    margin-left: 5px;
    margin-right: 5px;
   }
  
  .details p {
    font-size: 12px;
    font-family: 'Poppins';
    margin-left: 5px;
    color: #fff;
    margin-right: 5px;
         }
 .to {
  display: flex;
  flex-direction: column;
    margin-left: 5px;
    margin-right: 5px;
  }
  
  .to p {
    font-size: 12px;
    font-family: 'Poppins';
    margin-left: 5px;
    color: #fff;
    margin-right: 5px;
   }

   .footer {
    display: flex;
     align-items: center;
     flex-direction: column; 
     justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
 padding-right: 5px;
    width:25px;
    height: 100%;
    background-color:#fff;
    font-family: 'Poppins';
    font-size: 12px;
    white-space: nowrap;
    
    
  }

  .footer .organizer {
    margin-left: 5px;
    margin-right: 5px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    

  }
 .footer .organizer p {
    transform: rotate(270deg);
    margin-left: 5px;
    margin-right: 5px;
    color: #000;
 }
 .footer .organizer img {
    width: 20px;
    height: 20px;
    
 }
          </style>
        </head>
        <body>
  <div class="ticket" style="background-image: url('${
    data.event.banner_image_url
  }');">
    <div class="left">
    <div class="event">
    <p class="title">${data.event.title}</p>
    <p class="description">${data.event.description}</p>
    </div>
      <div class="date">
        <div class="category">
            <span>${data.event.category}</span>
        </div>
        <div class="datetime">
            <p><b>From :</b> ${new Date(
              data.event.date_time.start
            ).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
</p>
            <p><b>To :</b> ${new Date(data.event.date_time.end).toLocaleString(
              "en-IN",
              { timeZone: "Asia/Kolkata" }
            )}
</p>
        </div>
      </div>
     
    </div>
    <div class="right">
        <div class="qr-info">
            <div class="qr-mini">
                <img src="${qrImage}" alt="qr">
              </div>
              <div class="qr-code">
                <p class="code">${data.registration.code}</p>
              </div>      
        </div>
      <div class="details">
        <p>Price : <b> ${data.event.pricing.amount}</b><br/>
            Location : <b> ${data.event.location}</b></p>
      </div>
      <div class="to">
        <p>
          <b> To :</b>
          <br/>
          ${data.user.full_name}<br/>
            ${data.user.email}
        </p>
      </div>    

    </div>
    <div class="footer">
        <div class="organizer">
            <p>Organized by : <b>${data.event.organizer.full_name}</b></p>
        </div>

       </div>
  </div>
</body>
      </html>
    `;

    const imageBuffer = await htmlToPng(html);

    res.set("Content-Type", "image/png");
    res.send(imageBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to generate ticket");
  }
});

export default router;
