class Facade {
  constructor(Schema, fieldsToPopulate = []) {
    this.Schema = Schema;
    this.fieldsToPopulate = Array.from(fieldsToPopulate);
  }

  populate(query) {
    let q = query;
    if (this.fieldsToPopulate.length > 0) {
      q = query.populate(this.fieldsToPopulate.join(' '));
    }
    return q;
  }

  create(input) {
    const schema = new this.Schema(input);
    return schema.save();
  }

  update(conditions, update) {
    return this.Schema
      .update(conditions, update, { new: true })
      .exec();
  }

  find(query) {
    let q = this.Schema.find(query);
    return this.populate(q).exec();
  }

  findOne(query) {
    let q = this.Schema.findOne(query);
    return this.populate(q).exec();
  }

  findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error({
        code: 400,
        description: 'ID inválido. Ele deve ser do tipo ObjectId.'
      });
    }

    let q = this.Schema.findById(id);
    return this.populate(q).exec();
  }

  remove(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error({
        code: 400,
        description: 'ID inválido. Ele deve ser do tipo ObjectId.'
      });
    }

    return this.Schema
      .findByIdAndRemove(id)
      .exec();
  }
}

module.exports = Facade;
