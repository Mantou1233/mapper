declare const any: any;
Hud.createScreen("", false).addItem;
(any as BaseScreen).addItem;
(any as IScreen).addItem;
(any as JavaArray<number>).slice;
any as JavaObject;
Packages.xyz.wagyourtail.wagyourgui.BaseScreen;

java.util.Map.class;
java.util.function.Function.class;
java.util.function.Consumer;
Packages.javax.lang.model.type;
Packages.java.lang.module;
//@ts-ignore
java.lang.System.exit(0);
Packages.xyz.wagyourtail.jsmacros.client.api.classes.worldscanner
	.WorldScannerBuilder;
World.getWorldScanner()
	.withBlockFilter("getBlastResistance")
	.withStateFilter("getLuminance");
any as BlockHelper;
Packages.xyz.wagyourtail.jsmacros.client.api.classes.inventory.Inventory;
Packages.it.unimi.dsi.fastutil.ints.IntList;
Packages.xyz.wagyourtail.Pair;
Packages.xyz.wagyourtail.jsmacros.core.language.BaseWrappedException;
Packages.xyz.wagyourtail.jsmacros.core.library.impl.classes.FileHandler;
Packages.xyz.wagyourtail.jsmacros.client.api.classes.render.components.Item;
Packages.xyz.wagyourtail.jsmacros.client.api.classes.render.components.Rect;
Packages.xyz.wagyourtail.jsmacros.client.api.classes.render.components.Line;
Java.type("");
Java.type("it.unimi.dsi.fastutil.ints.IntList");
Java.type("xyz.wagyourtail.jsmacros.client.api.classes.inventory.Inventory")
	.create;
Java.type("net.minecraft");
Reflection.getClass("it.unimi.dsi.fastutil.ints.IntList");
Reflection.getClass(
	"xyz.wagyourtail.jsmacros.client.api.classes.inventory.Inventory"
);
Reflection.getClass("net.minecraft.");
Reflection.getClass("float");
new (Reflection.getClass("java.util.HashMap"))();
Reflection.createClassBuilder(
	"any",
	java.util.Map.class,
	java.util.function.Consumer.class
);
const iterableTest = [...World.getEntities()];
World.getEntities().iterator();
java.util.Map.copyOf(any as Packages.java.util.Map<string, number>).asdf;
Client.shutdown;
Player.createPlayerInputsFromCsv;
World.getWorldScanner;
World.getPlayers();
Reflection.loadMappingHelper;
(any as ClassBuilder).addMethod("asd");
(any as LibraryBuilder).addConstructor();
Hud.createDraw3D().addPoint;
const screen = Hud.createScreen("Test", true);
Hud.openScreen(screen);
(any as ScriptScreen).render;
(any as BaseScreen).render;
(any as IScreen).render;
(any as IDraw2D).render;
Player.openInventory().getSlot(0).getItemID;
any as SuggestionsBuilderHelper;
const d2d = Hud.createDraw2D();
d2d.setOnInit(
	JavaWrapper.methodToJava(() => {
		d2d.addRect(20, 20, 100, 100, 0x00ff00);
	})
);
d2d.register();
(event as Events.Service).stopListener = JavaWrapper.methodToJava(() => {
	d2d.unregister();
});

JsMacros.on(
	"EntityHealed",
	JavaWrapper.methodToJava((e, ctx) => {
		ctx.releaseLock();
		e.entity;
		e.damage;
		e.health;
	})
);
event as Events.RecvMessage;


// type Pos3DTuple = [number, number, number]
// declare const d3d: Draw3D;
// declare function posMethod(x: number, y: number, z: number): void;

// declare const pos: Pos3DTuple;
// // good
// posMethod(...pos)

// declare const jsmPos: Pos3D;
// // @ts-ignore wait for iterable Positions merge into main
// posMethod(...jsmPos)

// declare const testPos: testPos3D;
// // err: A spread argument must either have a tuple type or be passed to a rest parameter.
// posMethod(...testPos)
// declare function posMethod2(...pos: testPos3D): void;
// // Argument of type 'number[]' is not assignable to parameter of type 'testPos3D'.
// //  Target requires 3 element(s) but source may have fewer.
// posMethod2(...testPos)
// interface testPos3D extends Pos3DTuple {}
