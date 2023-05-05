const userSchema = require('./schemas/userSchemas');

class Validator{
    async validateAndSanitize(requestBody){
            const requestAttributes = Object.keys(userSchema);
            const errors = [];
            let sanitizedData = {};
            requestAttributes.forEach((attribute)=>{
                this.checkDatatype(attribute,requestBody[attribute],errors);
                this.checkLength(attribute,requestBody[attribute],errors);
                
                if(requestBody[attribute]) {
                    sanitizedData[attribute]=requestBody[attribute];
                }
            });
    
            if(errors.length>0){
                throw errors;
            }
            
            requestBody = sanitizedData;        
    }

    async checkLength(field, value, errors){
        if(!value){
            return;
        }
        if(userSchema[field].maxLength && value.length>userSchema[field].maxLength){
            errors.push({
                attribute:field,
                detail:`Attribute ${field} should be under ${userSchema[field].maxLength} length`
            })
        }
    }

    async checkDatatype(field, value, errors){
        if(!value){
            return;
        }
        if(userSchema[field].type && typeof value!=userSchema[field].type){
            errors.push({
                attribute:field,
                detail:`Attribute ${field} should be of ${userSchema[field].type} type`
            })
        }
    }
}

module.exports = new Validator();