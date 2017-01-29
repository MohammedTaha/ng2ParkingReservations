interface iUser {UserType : String, FirstName:String, LastName:String, Age:Number, Gender: String, Email: String,  uid: String}

export class User {

    constructor(public user : iUser){

    }

}