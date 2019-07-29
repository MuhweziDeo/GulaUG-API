import SpecificationService from '../../services/SpecificationService';
import SendErrorHelper from '../../helpers/sendErrorHelper';

export default class SpecificationController {

    static async addSpecification(req, res) {
        try {
            const { params: { productUUid }, body } = req;
            const { data, isNewRecord } = await SpecificationService.createSpecification(
                productUUid, body);

            if (!isNewRecord) {

                return res.status(409).send({
                    success: false,
                    message: `Specification already with name ${body.name} exists`,
                    data
                })
            }
            return res.json({
                success: true,
                message: 'Specification successfully created',
                data
            });
            
        } catch (error) {
            await SendErrorHelper.sendError(res, error);
        }
    }

    static async updateSpecification(req, res) {
        
        const { params: { productUUid, id }, body } = req;
        const [,[results]] = await SpecificationService.updateSpecification(productUUid, id, body)
        return res.json({
            message: 'Product specification updated successfully',
            success: true,
            results
        });
    }

    static async deleteSpecification(req, res) {
        const { params: { id } } = req;
        await SpecificationService.deleteSpecification(id);
        return res.json({
            success: true,
            message: 'Product specification successfully deleted'
        })
    }
}