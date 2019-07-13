import CategoryService from "../../services/CategoryService";
import SendErrorHelper from "../../helpers/sendErrorHelper";

class CategoryController {

    static async createCategory (req, res) {
        try {
            const {isNewRecord, dataValues} = await CategoryService.createCategory(req.body)

            if (!isNewRecord) {
                return  res.status(409).send({
                    success: false,
                    message: `Category with name ${dataValues.name} already exists`
                })
            }

            return res.json({
                success: true,
                message: 'Category successfully added',
                data: dataValues
            });

        }catch (e) {
            await SendErrorHelper.sendError(res,e);
        }

    }

    static async getAllCategories(req, res) {
        const { query: { start, end }} = req;
        const results = await CategoryService.getAllCategories(start, end);
        return res.json({
                categories: results
        });
    };

    static async updateCategory(req, res) {
        const { params: { id } } = req;
        const [success,results] = await CategoryService.updateCategory(id, req.body);
        if (success) {
            return res.json(results[0]);
        }
        return res.status(404).send({
            success: false,
            message: 'category not found'
        })

    }

    static async deleteCategory(req, res) {
        const { params: { id } } = req;
        const result = await CategoryService.deleteCategory(id);
        if (!result) {
            return res.status(404).send({
                success: false,
                message: 'category not found'
            });
        }
        return res.status(200).send({
            success: true,
            message: 'category deleted'
        });

    }

    static async createSubcategory(req, res) {
        const { body, params: { id } } = req;
        const subCategoryData = {
            ...body,
            id
        };
        const { data, isNewRecord} = await CategoryService.createSubCategory(subCategoryData);
        if (!isNewRecord) {
            return res.status(409).send({
                success: false,
                message: `Subcategory with name ${body.name} already exists`
            })
        }
        return res.status(201).send({
            success: true,
            data,
            message:'Subcategory successfully added'
        });
    }

    static async updateSubCategory(req, res) {
        try {
            const {body, params: { subCategoryId } } = req;
            const [,[results]] = await CategoryService.updateSubCategory(subCategoryId, body);
            return  res.status(200).send({
                success: true,
                message: 'Subcategory update successfully',
                data: results
            });

        }catch (e) {
            await SendErrorHelper.sendError(res, e);
        }


    }

    static async deleteSubCategory(req, res) {
        try {
            const { params: { subCategoryId } } = req;
            const results = await CategoryService.deleteSubCategory(subCategoryId);
            if (results) {
                return res.json({
                    message: 'SubCategory successfully deleted',
                    success: true
                });
            }
            return res.status(500).send({
                success: false,
                message: 'SubCategory was not deleted'
            })


        }catch (e) {
           await SendErrorHelper.sendError(res, e);
        }
    }

}

export  default CategoryController;
