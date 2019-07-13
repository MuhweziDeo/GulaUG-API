import { Op } from 'sequelize';
import models from '../database/models';

const { Category, SubCategory } = models;

class CategoryService {

    static async createCategory(categoryObject) {
        try {
            const { name } = categoryObject;
            const [category] = await Category.findOrCreate(
                { where: {name: {[Op.like]:`${name.trim()}%` }},
               defaults: { name: name.trim() }});
            const { _options: { isNewRecord }, dataValues} = category;
            return {
                isNewRecord,
                dataValues
            };

        }catch (e) {
            return e;
        }

    };

    static async getAllCategories(start, end) {

        const limitStart = start ? start: 0;
        const limitEnd = end ? end : 10;
        const categories = await Category.findAll(
                { offset: limitStart, limit: limitEnd,
                    include: [{model: SubCategory }]
                });
        return categories;
    };

    static async updateCategory(categoryId, updateObject) {
        try {

            const results = await Category.update(
                {...updateObject},
                { returning: true, where: {id: categoryId }}
            );
            return results;

        }catch (e) {
           return e;
        }
    }

    static async deleteCategory(id) {
        try {
            const result = await Category.destroy({ where: {id}});
            return result;
        }catch (e) {
            return e;
        }

    };

    static async findCategoryById(id) {
        const category = await Category.findOne({where: { id } });
        return category;
    }

    static async findSubCategoryById(id) {
        const subCategory = await SubCategory.findOne({where: { id } });
        return subCategory;
    }

    static async createSubCategory(subCategoryObject) {
        try {
            const { name, id } = subCategoryObject;
            const [ data, isNewRecord ] = await SubCategory.findOrCreate({
                where: { name, categoryId: id }
            });
            return { data,isNewRecord};

        } catch (e) {
            return e;
        }

    }
    static async updateSubCategory(subCategoryId, updateObject) {
        try {

            const results = await SubCategory.update(
                {...updateObject},
                { returning: true, where: {id: subCategoryId }}
            );
            return results;

        }catch (e) {
            return e;
        }
    }

    static async deleteSubCategory(id) {
        try {
            const result = await SubCategory.destroy({ where: {id}});
            return result;
        } catch (e) {
            return e;
        }

    };




}

export  default CategoryService;
