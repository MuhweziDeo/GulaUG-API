import { Specification } from '../database/models';

export default class SpecificationService {

    static async createSpecification(productUuid, specificationObject) {
        
        const { name, description } = specificationObject;
        const [data, isNewRecord] =  await Specification.findOrCreate({
                where: { name, productUuid },
                defaults: { description }
        });
        return { data, isNewRecord };
                 
    }

    static async updateSpecification(productUuid, id, updateObject) {
        
        const result = await Specification.update(
            {...updateObject}, 
            {returning: true, where: { productUuid, id }}
        );
        return result;
    }

    static async findSpecification(productUuid, id) {
        const result = await Specification.findOne({
            where: { productUuid, id }
        });
        return result;
    }

    static async deleteSpecification(id) {
        
        const result = await Specification.destroy({
                where: { id }
        });
        return result;
              
    }

}