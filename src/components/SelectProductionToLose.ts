
import Vue from "vue";

interface SelectProductionToLoseModel {
    megacredits: number;
    steel: number;
    titanium: number;
    plants: number;
    energy: number;
    heat: number;
    warning: string | undefined;
}

import { IProductionUnits } from "../inputs/IProductionUnits";
import { PaymentWidgetMixin } from "./PaymentWidgetMixin";
import { IPayProductionModel } from "../models/IPayProductionUnitsModel";

export const SelectProductionToLose = Vue.component("select-production-to-lose", {
    props: ["player", "playerinput", "onsave", "showsave", "showtitle"],
    data: function () {
        return {
            megacredits: 0,
            steel: 0,
            titanium: 0,
            plants: 0,
            energy: 0,
            heat: 0,
            warning: undefined
        } as SelectProductionToLoseModel;
    },
    mixins: [PaymentWidgetMixin], //for getCssClassFor. Seems over-importish
    methods: {
        canDeductMegaCredits: function() {
            return this.playerinput.payProduction.megacredits > -5;
        },
        canDeductSteel: function() {
            return this.playerinput.payProduction.steel > 0;
        },
        canDeductTitanium: function() {
            return this.playerinput.payProduction.titanium > 0;
        },
        canDeductPlants: function() {
            return this.playerinput.payProduction.plants > 0;
        },
        canDeductEnergy: function() {
            return this.playerinput.payProduction.energy > 0;
        },
        canDeductHeat: function() {
            return this.playerinput.payProduction.heat > 0;
        },
        hasWarning: function () {
            return this.$data.warning !== undefined;
        },
        delta: function(type: string, direction: number) {
            var expendableProductionQuantity = function(type: string, model: IPayProductionModel): number {
                switch(type) {
                case "megacredits":
                    return model.units.megacredits + 5;
                case "steel":
                    return model.units.steel;
                case "titanium":
                    return model.units.titanium;
                case "plants":
                    return model.units.plants;
                case "energy":
                    return model.units.energy;
                case "heat":
                    return model.units.heat;
                }
                return -1;
            }
            var current = this.$data[type];
            var newValue = current + direction;
            var lowestValue = (type === "megacredit") ? -5 : 0;
            var expendableQuantity = expendableProductionQuantity(type, this.playerinput.payProduction as IPayProductionModel);
            newValue = Math.min(Math.max(newValue, lowestValue), expendableQuantity);
            this.$data[type] = newValue;
        },
        saveData: function () {
            const htp: IProductionUnits = {
                megacredits: this.$data.megacredits,
                steel: this.$data.steel,
                titanium: this.$data.titanium,
                plants: this.$data.plants,
                energy: this.$data.energy,
                heat: this.$data.heat
            };

            var sum = this.$data.megacredits +
                this.$data.steel +
                this.$data.titanium +
                this.$data.plants +
                this.$data.energy +
                this.$data.heat;

            if (sum !== this.playerinput.payProduction.cost) {
                this.$data.warning = `Pay a total of ${this.$data.cost} production units`;
                return;
            }

            this.onsave([[
                JSON.stringify(htp)
            ]]);
        }
    },

    template: `<div class="wf-component wf-component--select-production-to-lose">
        <div v-if="showtitle === true" class="nofloat wf-component-title" v-i18n>{{playerinput.title}}</div>

        <h3 class="payments_title">Which resource production will you lose?</h3>

        <div class="payments_type input-group" v-if="canDeductMegaCredits()">
          <div class="production-box"><div class="production resource_icon--megacredits" style="background-size:contain;"></div></div>
          <button class="btn btn-primary" v-on:click="delta('megacredits', -1)" :class="getCssClassFor('<', 'megacredit')"><i class="icon icon-minus" /></button>
          <input class="form-input form-inline payments_input" v-model.number="megacredits" />
          <button class="btn btn-primary" v-on:click="delta('megacredits', 1)" :class="getCssClassFor('>', 'megacredit')"><i class="icon icon-plus" /></button>
        </div>
        <div class="payments_type input-group" v-if="canDeductSteel()">
          <div class="production-box"><div class="production steel"></div></div>
          <button class="btn btn-primary" v-on:click="delta('steel', -1)" :class="getCssClassFor('<', 'steel')"><i class="icon icon-minus" /></button>
          <input class="form-input form-inline payments_input" v-model.number="steel" />
          <button class="btn btn-primary" v-on:click="delta('steel', 1)" :class="getCssClassFor('>', 'steel')"><i class="icon icon-plus" /></button>
        </div >
        <div class="payments_type input-group" v-if="canDeductTitanium()" >
          <div class="production-box"><div class="production titanium"></div></div>
          <button class="btn btn-primary" v-on:click="delta('titanium', -1)" :class="getCssClassFor('<', 'titanium')"><i class="icon icon-minus" /></button>
          <input class="form-input form-inline payments_input" v-model.number="titanium" />
          <button class="btn btn-primary" v-on:click="delta('titanium', 1)" :class="getCssClassFor('>', 'titanium')"><i class="icon icon-plus" /></button>
        </div >
        <div class="payments_type input-group" v-if="canDeductPlants()" >
          <div class="production-box"><div class="production plants"></div></div>
          <button class="btn btn-primary" v-on:click="delta('plants', -1)" :class="getCssClassFor('<', 'plants')"><i class="icon icon-minus" /></button>
          <input class="form-input form-inline payments_input" v-model.number="plants" />
          <button class="btn btn-primary" v-on:click="delta('plants', 1)" :class="getCssClassFor('>', 'plants')"><i class="icon icon-plus" /></button>
        </div >
        <div class="payments_type input-group" v-if="canDeductEnergy()" >
          <div class="production-box"><div class="production energy"></div></div>
          <button class="btn btn-primary" v-on:click="delta('energy', -1)" :class="getCssClassFor('<', 'energy')"><i class="icon icon-minus" /></button>
          <input class="form-input form-inline payments_input" v-model.number="energy" />
          <button class="btn btn-primary" v-on:click="delta('energy', 1)" :class="getCssClassFor('>', 'energy')"><i class="icon icon-plus" /></button>
        </div >
        <div class="payments_type input-group" v-if="canDeductHeat()" >
          <div class="production-box"><div class="production heat"></div></div>
          <button class="btn btn-primary" v-on:click="delta('heat', -1)" :class="getCssClassFor('<', 'heat')"><i class="icon icon-minus" /></button>
          <input class="form-input form-inline payments_input" v-model.number="heat" />
          <button class="btn btn-primary" v-on:click="delta('heat', 1)" :class="getCssClassFor('>', 'heat')"><i class="icon icon-plus" /></button>
        </div >

        <div v-if="hasWarning()" class="tm-warning">
          <label class="label label-error">{{ warning }}</label>
        </div>
  
        <div v-if="showsave === true" class="nofloat">
            <button class="btn btn-primary btn-submit" v-on:click="saveData">{{playerinput.buttonLabel}}</button>
        </div>
    </div>`
});

