type HandleJavaObject<Clazz> = {
	class: Clazz;
	/** @deprecated */ Symbol: unknown;
	/** @deprecated */ apply: unknown;
	/** @deprecated */ arguments: unknown;
	/** @deprecated */ bind: unknown;
	/** @deprecated */ call: unknown;
	/** @deprecated */ caller: unknown;
	/** @deprecated */ length: unknown;
	/** @deprecated */ name: unknown;
	/** @deprecated */ prototype: unknown;
};
declare namespace Packages {
	declare namespace bum {
		interface Bum {
			eat(): Bum;
		}
		interface BumConstructor extends HandleJavaObject<Bum> {
			new (): Bum;
			new (anotherBum: Bum): Bum;
			imStaticValue_Tm: number;
			// java crap here!!
		}
		export const Bum: BumConstructor;
		// or use a generic and let XxxConstructor inheit it
	}
}
type clazz = Packages.bum.Bum;
const Pa = Packages.bum.Bum;
