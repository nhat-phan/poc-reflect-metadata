namespace Najs.Contracts {
  export declare class Autoload<T extends Object = Object> {
    /**
     * The context object passed from a hosted class which use @autoload
     */
    protected __autoloadContext: T
  }

  export interface Autoload<T extends Object = Object> {
    /**
     * Get name of the class.
     *
     * Please use decorator type() instead of getClassName(), it will be remove in version 2.x
     *
     * @deprecated
     */
    getClassName(): string
  }
}
