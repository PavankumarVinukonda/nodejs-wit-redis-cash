import {DataTypes,Model,Optional} from 'sequelize'
import {Table,Index} from 'sequelize-typescript'
// in order to use db connection
import sequelizeConnection from './config'


interface userAttributes {

     id:number;
     first_name:string;
     last_name:string;
     email:string;
     phone:number;
     password:number;

     createdAt?:Date;
     updatedAt?:Date;
     deletedAt?:Date;

}


export interface userInput extends Optional<userAttributes,'id'> {}
export interface userOutput extends Required<userAttributes> {}

class user extends Model<userAttributes,userInput> implements userAttributes {
    public id!:number;
    public first_name!: string;
    public last_name!: string;
    public email!: string;
    public phone!: number;
    public password!: number;

    public readonly createdAt!: Date ;
    public readonly updatedAt!: Date ;
    public readonly deletedAt!: Date ;

    
   
}




// @Table
// @Index({fields:['email'],unique:true})

user.init (
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:true,
            primaryKey:true,
            autoIncrement:true,
            unique:true
        },
        first_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        last_name: {
            type:DataTypes.STRING,
            allowNull:false
        },
        email: {
            type:DataTypes.STRING,
            allowNull:false
        },
        phone: {
            type:DataTypes.INTEGER,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    // {
    //     indexes:[{name:'idx_full_name',fields:['first_name','last_name']}]
    // },
    {
        timestamps:true,
        sequelize:sequelizeConnection,
        paranoid:true,
        indexes:[{name:'full_name',fields:['first_name','last_name']}]
    }
)

export default user;