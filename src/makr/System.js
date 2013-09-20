/**
 * A system that processes entities.
 *
 * @class System
 * @constructor
 */
function System() {
  /**
   * @private
   * @property {BitSet} _componentMask
   */
  this._componentMask = makr.MAX_COMPONENTS <= 32
    ? new FastBitSet()
    : new BitSet(makr.MAX_COMPONENTS);

  /**
   * @private
   * @property {Entity[]} _entities
   */
  this._entities = [];

  /**
   * @private
   * @property {World} _world
   */
  this._world = null;

  /**
   * @property {Boolean} enabled
   */
  this.enabled = true;
}

/**
 * @final
 * @method registerComponent
 * @param {Uint} type
 */
System.prototype.registerComponent = function System_registerComponent(type) {
  this._componentMask.set(type, 1);
};

/**
 * @final
 * @method update
 * @param {Float} elapsed
 */
System.prototype.update = function System_update(elapsed) {
  if (this.enabled) {
    this.onBegin();
    this.processEntities(this._entities, elapsed);
    this.onEnd();
  }
};

/**
 * @method processEntities
 * @param {Entity[]} entities
 * @param {Float} elapsed
 */
System.prototype.processEntities = function System_processEntities(entities, elapsed) {};

/**
 * @method onRegistered
 */
System.prototype.onRegistered = function System_onRegistered() {};

/**
 * @method onBegin
 */
System.prototype.onBegin = function System_onBegin() {};

/**
 * Called after the end of processing.
 *
 * @method onEnd
 */
System.prototype.onEnd = function System_onEnd() {};

/**
 * Called when an entity is added to this system
 *
 * @method onAdded
 * @param {Entity} entity
 */
System.prototype.onAdded = function System_onAdded(entity) {};

/**
 * Called when an entity is removed from this system
 *
 * @method onRemoved
 * @param {Entity} entity
 */
System.prototype.onRemoved = function System_onRemoved(entity) {};

/**
 * @private
 * @method _addEntity
 * @param {Entity} entity
 */
System.prototype._addEntity = function System__addEntity(entity) {
  var entities = this._entities;
  if (entities.indexOf(entity) < 0) {
    entities.push(entity);
    this.onAdded(entity);
  }
};

/**
 * @private
 * @method _removeEntity
 * @param {Entity} entity
 */
System.prototype._removeEntity = function System__removeEntity(entity) {
  var entities = this._entities;
  var i = entities.indexOf(entity);
  if (i >= 0) {
    entities[i] = entities[entities.length - 1];
    entities.pop();
    this.onRemoved(entity);
  }
};

/**
 * @property {Boolean} world
 */
Object.defineProperty(System.prototype, 'world', {
  get: function() {
    return this._world;
  }
});
