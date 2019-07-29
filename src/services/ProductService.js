import uuid from 'uuid/v4';
import {
    Product,
    User,
    Profile,
    Specification,
    Category,
    SubCategory
} from  '../database/models';

export default class ProductService {

    static async createProduct(productObject) {
        try {
            const results = await Product.create({
                ...productObject,
                productUuid: uuid(),
                include: [{model: Specification}]
            });
            return results;
        } catch (error) {
            return error;
        }
    }
    static async getProducts(limitStart, limitEnd) {
        const start = limitStart ? limitStart : 0;
        const end  = limitEnd ? limitEnd : 10;
        const results = await Product.findAll({
            include: [ {
                model: User,
                as: 'Seller',
                attributes:{
                exclude: ['password']},
                include:[
                    {
                    model: Profile,
                    as: 'Profile',
                    attributes: ['image']
                    },
                    ],
                } ,{ model: Specification },
                { model: Category }, { model: SubCategory } ],
                offset: start,
                limit: end
        });
        return results;
    }


    static async findProductByUuid(productUuid) {

        const result = await Product.findOne({
                where: { productUuid },
                include: [{
                    model: User,
                    as: 'Seller',
                    attributes:{
                    exclude: ['password']},
                    include:[{
                        model: Profile,
                        as: 'Profile',
                        attributes: ['image']
                    }],
               },{ model: Specification }, { model: Category }, 
               { model: SubCategory } ]
        });
    
        return result;
    }

    static async updateProduct(productUuid, updateObject) {
        const [ ,result] = await Product.update(
            { ...updateObject }, 
            {returning: true, where: {productUuid}}
            );
        return {result};
    }

    static async deleteProduct(productUuid) {
        const result = await Product.destroy({
            where: { productUuid }
        });
        return result;
    }


}
