class EntityController {
    constructor(Model) {
        this.Model = Model;
    }

    getEntity(call) {
        this.Model
            .find()
            .lean()
            .exec(function (err, entity) {
                if (err) {
                    call(err, null);
                } else {
                    call(null, entity);
                }
            });
    }

    getEntityById(id, call) {
        this.Model.findById(id, function(err, entity) {
            if (err) {
                call(err, null);
            } else {
                call(null, entity);
            }
        });
    }

    addEntity(newEntity, call) {
        newEntity
            .save(function(err) {
                if (err){
                    call(err, null);
                }else{
                    call((null, newEntity));
                }
            });
    }

    deleteEntity(id, call) {
        this.Model.findByIdAndRemove(id, function(err) {
            if (err){
                call(err);
            }else{
                call(null);
            }
        });
    }

    updateEntity(_entity, call) {
        this.Model.findById(_entity._id, function(err, entity) {
            if (err){
                call(err, null);
            }else {
                Object
                    .keys(_entity)
                    .forEach(function (key) {
                        entity[key] = _entity[key];
                    });
                entity.save(function (err) {
                    if (err) {
                        call(err, null);
                    } else {
                        call(null, entity);
                    }
                });
            }
        });
    }
}

module.exports = EntityController;
