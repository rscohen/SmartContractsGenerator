//const SmartContractDraft:string='';

export default {

  getPage: (req, res) => {
    res.render('deployment');
  },

  deploy: (req, res) => {
    var network = req.body.network;
  },
}
