const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    store_id: {type:String, required:true},
    store_password: {type:String, required:true},
    currency: {type:String, required:true},
    sucess_url: {type:String, required:true},
    fail_url: {type:String, required:true},
    cencel_url: {type:String, required:true},
    init_url: {type:String, required:true},
    ipn_url: {type:String, required:true},

},
    {timestamps:true,versionKey:false}
)


const PaymentSettingModel = mongoose.model('paymentsettings', DataSchema);
module.exports=PaymentSettingModel;