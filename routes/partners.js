const express = require("express");
const router = express.Router();
const path = require('path');
const fs = require('fs');
const partnersJson = path.join(__dirname, '../routes/partners.json');
const {
    calculatDistance
} = require('./helpers');

//api to get partners by longitude and latitude  
router.post("/partners", async (req, res) => {
    try {
        const data = req.body;
        const { distance, unit, longitude, latitude } = data;
        if(distance && unit &&  longitude && latitude){
            const venueLocation = {
              latitude,
              longitude
            };

            const partnersList = JSON.parse(fs.readFileSync(partnersJson, { encoding: 'utf8' }));

            // filtered the offices within given range
            partnersList.map(partner => partner.offices = partner.offices.filter((office => Math.floor(calculatDistance(venueLocation, office.coordinates, unit)) <= distance)));
            const filteredArray = partnersList.filter(partner => partner.offices.length > 0);
            const partnersForInvitation = filteredArray.sort((a, b) => {
              let fa = a.organization.toLowerCase(),
                  fb = b.organization.toLowerCase();
          
                      if (fa < fb) {
                          return -1;
                      }
                      if (fa > fb) {
                          return 1;
                      }
                      return 0;
                  });
           
            return res.status(200).send({ partners: partnersForInvitation });
        }else{
            return res.status(400).send({ failed:'Missing Parameters'});
        }
    } catch (err) {
      return res.status(404).send({
        error: err,
      });
    }
  });

router.get("/allpartners", async (req, res) => {
    try {
          const partnersList = JSON.parse(fs.readFileSync(partnersJson, { encoding: 'utf8' }));

          

            return res.status(200).send({ partners: partnersList });
        
    } catch (err) {
      return res.status(404).send({
        error: err,
      });
    }
  });

module.exports = router;
