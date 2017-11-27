function CreateController(){
    var EntityController = function (Model) {
        this.Model = Model;
    };

    function getEntity(call) {
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

    function getEntityById(id, call) {
        this.Model.findById(id, function(err, entity) {
            if (err) {
                call(err, null);
            } else {
                call(null, entity);
            }
        });
    }

    function addEntity(newEntity, call) {
        newEntity
            .save(function(err) {
                if (err){
                    call(err, null);
                }else{
                    call((null, newEntity));
                }
            });
    }

    function deleteEntity(id, call) {
        this.Model.findByIdAndRemove(id, function(err) {
            if (err){
                call(err);
            }else{
                call(null);
            }
        });
    }

    function updateEntity(_entity, call) {
        this.Model.findById(_entity._id, function(err, entity) {
            if (err){
                call(err, null);
            }else {
                Object.keys(_entity).forEach(function (key) {
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

    EntityController.prototype.getEntity = getEntity;
    EntityController.prototype.getEntityById = getEntityById;
    EntityController.prototype.addEntity = addEntity;
    EntityController.prototype.deleteEntity = deleteEntity;
    EntityController.prototype.updateEntity = updateEntity;

    return EntityController;
}

module.exports = CreateController;
