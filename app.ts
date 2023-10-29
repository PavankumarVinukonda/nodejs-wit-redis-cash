import express,{Request,Response, response} from 'express'
import cors from 'cors'
import dbInit from './src/db/init';
import { redisClient } from './src/cashing/redisCashconfig';
import axios from 'axios';


const app = express();

// for cors polacy
app.use(cors())
// for body parcing
app.use(express.json())

// intilizing the database
dbInit()

const url = 'https://fakestoreapi.com/products'
app.get('/',async (req:Request,res:Response ) => {
    try {

        let isCashed = false;

        const productCashing = await redisClient.get('products');
        
        if (productCashing) {
            isCashed= true
            res.send({isCashed,data:JSON.parse(productCashing)})
        }
        else {
            const apiResponse = await axios.get(
                `${url}`
              );
            
            const data = await apiResponse.data

            if (data?.length === 0 ) {
                res.send({message:'api returnd an empty arry'})
            }

            await redisClient.set('products', JSON.stringify(data));
            

            res.send({isCashed,data})
        }
        

    }
    catch (err:any) {
        res.send({message:err?.message})
    }
})

app.use(express.json())

const port = 9000;

app.listen(port,() => {
    console.log(port)
})

