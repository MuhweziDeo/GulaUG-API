import ProductService from "../../services/ProductService";
import SendErrorHelper from '../../helpers/sendErrorHelper';
import SpecificationService from "../../services/SpecificationService";

export default class ProductController {

    static async getAllProducts(req, res) {
        const { query: { offset, limit }} = req;
        const data = await ProductService.getProducts(offset, limit);
        return res.json({
            message: 'Fetched products successfully',
            success: true,
            data,
        });

    };

    static async getProduct(req, res) {

        return res.status(200).send({
                message: true,
                data: req.product
        });
    };

    static async createProduct(req, res) {
        try {
            const data  = {...req.body}
            data.userId = req.user.id;
            const result = await ProductService.createProduct(data);
            console.log(result);
            if (result.dataValues) {
                 data.specifications.map(async (spec) => {
                    await SpecificationService.createSpecification(result.productUuid,
                        { name: spec.name, description: spec.description,
                            productUuid: result.productUuid });
                });
                 return res.status(200).send({
                    message: 'Product successfully created',
                    data: result
                });
            }
            return res.status(500).send({
                    success: false,
                    message: "The product and specifications couldn't be created"
            }); 
        } catch (error) {
            await SendErrorHelper.sendError(res, error);
        }
        
    }

    static async updateProduct(req, res) {
        const { product: { productUuid }, body } = req;

        const { result } = await ProductService.updateProduct(productUuid, body);

        return res.json({
                    success: true,
                    message: 'Product updated successfully',
                    data: result[0]
                }); 
    }

    static async deleteProduct(req, res) {
        try {
            const { product: { productUuid } } = req;
            await ProductService.deleteProduct(productUuid);
            return res.json({
                success: true,
                message: 'Product successfully deleted'
            });
            
        } catch (error) {
            await SendErrorHelper.sendError(res, error);
        }
        
    }

}
