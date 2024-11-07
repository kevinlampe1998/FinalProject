import mongoose from "mongoose";

// Prozessor Schema
const processorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    kerne: { type: Number, required: true },
    basistakt: { type: String },
    turboTakt: { type: String },
    gpu_kerne: { type: Number }, // Für Apple M-Serie Chips
});

// Arbeitsspeicher Schema
const ramSchema = new mongoose.Schema({
    groesse: { type: Number, required: true },
    typ: { type: String, required: true },
    geschwindigkeit: { type: String },
});

// Bildschirm Schema
const displaySchema = new mongoose.Schema({
    groesse: { type: Number, required: true },
    aufloesung: { type: String, required: true },
    typ: { type: String, required: true },
    helligkeit: { type: Number },
    touchscreen: { type: Boolean, default: false },
});

// Grafik Schema
const graphicsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    vram: { type: Number },
    shared: { type: Boolean, default: false },
});

// Speicher Schema
const storageSchema = new mongoose.Schema({
    typ: { type: String, required: true },
    kapazitaet: { type: Number, required: true },
    erweiterbar: { type: Boolean, default: true },
});

// Akku Schema
const batterySchema = new mongoose.Schema({
    kapazitaet: { type: Number, required: true },
    laufzeit: { type: String },
});

// Hauptschema für Laptops
const productSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        hersteller: {
            type: String,
            required: true,
            index: true,
        },
        modell: {
            type: String,
            required: true,
        },
        preis: {
            type: Number,
            required: true,
            min: 0,
        },
        spezifikationen: {
            prozessor: processorSchema,
            arbeitsspeicher: ramSchema,
            bildschirm: displaySchema,
            grafik: graphicsSchema,
            speicher: storageSchema,
            akku: batterySchema,
            anschluesse: [{ type: String }],
            gewicht: { type: Number },
        },
        verfuegbar: {
            type: Boolean,
            default: true,
        },
        erstelltAm: {
            type: Date,
            default: Date.now,
        },
        aktualisiertAm: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: {
            createdAt: "erstelltAm",
            updatedAt: "aktualisiertAm",
        },
        versionKey: false,
    }
);

// Indizes für häufige Abfragen
productSchema.index({ preis: 1 });
productSchema.index({ "spezifikationen.prozessor.name": 1 });
productSchema.index({ "spezifikationen.bildschirm.groesse": 1 });

// Virtuelle Felder
productSchema.virtual("preisFormatiert").get(function () {
    return `${this.preis.toFixed(2)} €`;
});

// Middleware vor dem Speichern
productSchema.pre("save", function (next) {
    this.aktualisiertAm = new Date();
    next();
});

// Statische Methoden
productSchema.statics.findByHersteller = function (hersteller) {
    return this.find({ hersteller: new RegExp(hersteller, "i") });
};

productSchema.statics.findInPreisBereich = function (min, max) {
    return this.find({ preis: { $gte: min, $lte: max } });
};

// Instanz-Methoden
productSchema.methods.preisMitMwSt = function (mwstSatz = 0.19) {
    return this.preis * (1 + mwstSatz);
};

const Product = mongoose.model("Product", productSchema);

export default Product;
