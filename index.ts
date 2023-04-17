import JSZip from "jszip";
import fs from "fs";

const maps = {
	yarn: "https://maven.fabricmc.net/net/fabricmc/yarn/1.19.4%2Bbuild.2/yarn-1.19.4%2Bbuild.2-v2.jar",
	intermediary:
		"https://maven.fabricmc.net/net/fabricmc/intermediary/1.19.4/intermediary-1.19.4-v2.jar"
};

async function main(name, url) {
	const res = await fetch(url);
	const content = await JSZip.loadAsync(await res.arrayBuffer());
	const z = await content.file("mappings/mappings.tiny")?.async("string");
	//fs.writeFileSync(`${name}.tiny`, z!)
	fs.writeFileSync(`${name}.tiny`, z!);
	fs.writeFileSync(
		`${name}.tiny.json`,
		JSON.stringify(Object.fromEntries(parseTiny(z!.split("\n"))), null, 1)
	);
}
for (let [name, url] of Object.entries(maps)) main(name, url);

function parseTiny(str) {
	const mapped: {
		stage: number;
		type: string;
		args: string[];
	}[] = str.map(parseTinyLine);
	const metamap = new Map();

	for (let i = 0; i < mapped.length; i++) {
		const { stage, type, args } = mapped[i];

		switch (type) {
			case "tiny": {
				metamap.set("__from__", args[2]);
				metamap.set("__to__", args[3]);
				metamap.set("__resources__", []);
				break;
			}

			case "c": {
				if (stage == 0) {
					const clazz = checkBeyondClass(mapped, i);
					for (let method of clazz.method) {
						// @ts-ignore
						method.arguments = [];
						for (let ch of method.children) {
							if (ch.type == "param")
								// @ts-ignore
								method.arguments[+ch.args[0]] = ch.args[2];
							else if (ch.type == "comment")
								// @ts-ignore
								method.comment = ch.args[0];
						}
						// @ts-ignore
						delete method.children;
					}
					for (let field of clazz.field) {
						for (let ch of field.children) {
							if (ch.type == "comment")
								// @ts-ignore
								field.comment = ch.args[0];
						}
						// @ts-ignore
						delete field.children;
					}
					metamap.get("__resources__").push(clazz);
					metamap.set(
						clazz.to,
						metamap.get("__resources__").length - 1
					);
				}
			}
		}
	}
	return metamap;
}

function parseTinyLine(str: string) {
	let [stage, strs] = getCharCountAndTrim(str);

	return {
		stage: stage,
		type: strs[0],
		args: strs.slice(1)
	};
}

function getCharCountAndTrim(str, char = "\t", count = 0): [number, string[]] {
	if (str.startsWith(char)) {
		return getCharCountAndTrim(str.slice(1), char, ++count);
	} else return [count, str.split("\t")];
}

function checkBeyondClass(
	map: {
		stage: number;
		type: string;
		args: string[];
	}[],
	index: number
) {
	const current = map[index];
	const metaobj = {
		from: current.args[0],
		to: current.args[1],
		field: [] as {
			type: string;
			from: string;
			to: string;
			children: any[];
		}[],
		method: [] as {
			type: string;
			from: string;
			to: string;
			children: any[];
		}[]
	};
	let lastType: "field" | "method" | null = null;
	for (let i = index + 1; i < map.length; i++) {
		const { stage, type, args } = map[i];
		if (stage == 1) {
			switch (type) {
				case "f": {
					metaobj.field.push({
						type: args[0],
						from: args[1],
						to: args[2],
						children: []
					});
					lastType = "field";
					break;
				}
				case "m": {
					metaobj.method.push({
						type: args[0],
						from: args[1],
						to: args[2],
						children: []
					});
					lastType = "method";
					break;
				}
			}
		} else if (stage == 2) {
			switch (type) {
				case "p": {
					metaobj[lastType!].at(-1)?.children.push({
						type: "param",
						args
					});
					break;
				}
				case "c": {
					metaobj[lastType!].at(-1)?.children.push({
						type: "comment",
						args
					});
					break;
				}
			}
		} else return metaobj;
	}
	return metaobj;
}
