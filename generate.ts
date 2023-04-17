import __yarn from "./yarn.tiny.json" assert { type: "json" };
const yarn = __yarn as any;
const typingResolvers = {
	Z: "boolean",
	B: "number",
	C: "number",
	S: "number",
	I: "number",
	J: "number",
	F: "number",
	D: "number",
	V: "void"
};

class PackageElement {
	public fields: {
		type: string;
		resolvedType: string;
		from: string;
		to: string;
		arguments: [args: string[], returnType: string];
		comment: string | null;
	};
	public methods: {
		type: string;
		/**
		 * arg types
		 */
		resolvedType: [args: string[], returnType: string];
		from: string;
		to: string;
		/**
		 * string names of args
		 */
		arguments: string[];
		comment: string | null;
	};
	public yarn: string;
	public inm: string;

	constructor(clazz) {
		if (!clazz || !clazz.field || !clazz.method) throw new TypeError();
		this.fields = clazz.field.map(v => ({
			...v,
			resolvedType: internalResolveType(v.type),
			comment: v.comment || null
		}));
		this.methods = clazz.method.map(v => ({
			...v,
			arguments: v.arguments.map((val, i) =>
				val == null ? `arg${i}` : val
			),
			resolvedType: resolveType(v.type),
			comment: v.comment || null
		}));
		this.yarn = clazz.to.replaceAll("/", ".");
		this.inm = clazz.from.replaceAll("/", ".");
	}
	toString() {
		return this.yarn + "\n";
	}
	toNamespace() {
		
	}
}

class PackageTree {
	public pkgName;
	private children: Map<string, PackageTree | PackageElement> = new Map();

	constructor(pkgName) {
		this.pkgName = pkgName;
	}

	public add(pkgLike: PackageElement) {
		if (pkgLike instanceof PackageElement) {
			let pkgTree: PackageTree = this;
			for (let dt of pkgLike.yarn.split(".").slice(0, -1)) {
				pkgTree = pkgTree.getOrCreateTree(dt);
			}
			pkgTree.put(pkgLike.yarn.split(".").at(-1)!, pkgLike);
		}
	}
	public getOrCreateTree(pkg: string): PackageTree {
		if ((this.children.get(pkg) || {}) instanceof PackageElement)
			throw new Error();
		if (this.children.get(pkg))
			return this.children.get(pkg) as PackageTree;
		const pkgTree = new PackageTree(
			`${this.pkgName}${this.pkgName ? "." : ""}${pkg}`
		);
		this.children.set(pkg, pkgTree);
		return pkgTree as PackageTree;
	}

	public put(key: string, pkgLike: PackageTree | PackageElement) {
		this.children.set(key, pkgLike);
	}

	public toString() {
		let str = "";
		for (let child of this.children.values()) {
			str += child.toString();
		}
		return str;
	}

	public toNamespace() {
		let ns = "";
		if(this.pkgName == "") {
			ns = `declare namespace Package {`
			for (let child of this.children.values()) {
				ns += child.toNamespace();
			}
		}
	}
}

const sourceTree = new PackageTree("");
function generate() {
	let keys = Object.keys(yarn).filter(v => !v.startsWith("_"));
	for (let key of keys) {
		const element = new PackageElement(
			structuredClone(yarn.__resources__[yarn[key]])
		);

		sourceTree.add(element);
	}
	console.log(sourceTree.toString());
}

function resolveType(javaFnType: string) {
	let [argsType, returnType] = javaFnType
		.slice(1)
		.split(")")
		.map(internalResolveType);
	return [argsType, returnType[0]];
}

function internalResolveType(type) {
	let typePool: string[] = [];
	let a_rr = false;
	rs: while (type !== "") {
		if (type.startsWith("[")) {
			a_rr = true;
			type = type.slice(1);
			continue rs;
		}
		for (let [tr, _type] of Object.entries(typingResolvers)) {
			if (type.startsWith(tr)) {
				typePool.push(`${_type}${a_rr ? "[]" : ""}`);
				a_rr = false;
				type = type.slice(1);
				continue rs;
			}
		}
		if (type.startsWith("L")) {
			typePool.push(`I${type.slice(1).split(";")[0]}${a_rr ? "[]" : ""}`);
			a_rr = false;
			type = type.slice(1).split(";").slice(1).join(";");
			continue rs;
		}
	}
	return typePool;
}

generate();
