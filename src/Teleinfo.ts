export type Sample = {
  date: string;
  name: string;
  value: string;
};

class Power {
  readonly watts: number;

  private constructor(val_in_watts: number | string) {
    this.watts = Number(val_in_watts);
  }

  renderTokW(): string {
    return (this.watts / 1000.0).toFixed(1);
  }

  static Watt(val_in_watts: number | string) {
    return new Power(val_in_watts);
  }
}

class Energy {
  readonly watt_hour: number;

  private constructor(val_in_watts_hour: number | string) {
    this.watt_hour = Number(val_in_watts_hour);
  }

  renderTokWh(): string {
    return (this.watt_hour / 1000.0).toFixed(1);
  }

  static WattHour(val_in_watts_hour: number | string) {
    return new Energy(val_in_watts_hour);
  }
}

class Teleinfo {
  samples: Sample[];
  zero: Sample[];

  constructor(samples: Sample[], zero: Sample[]) {
    this.samples = samples;
    this.zero = zero;
  }

  getInstantPower(): Power {
    return Power.Watt(getIntValue("PAPP", this.samples));
  }

  getDailyConsumption() {
    const hp = getIntValue("BBRHPJB", this.samples);
    const hp_offset = getIntValue("BBRHPJB", this.zero);

    return Energy.WattHour(hp - hp_offset);
  }

  getNightlyConsumption() {
    const hp = getIntValue("BBRHCJB", this.samples);
    const hp_offset = getIntValue("BBRHCJB", this.zero);

    return Energy.WattHour(hp - hp_offset);
  }
}

export { Teleinfo, Power, Energy };

function getIntValue(name: string, vals: Sample[]): number {
  const ret = vals
    .filter((val: Sample) => {
      return val.name === name;
    })
    .map((val: Sample) => {
      return parseInt(val.value);
    });

  if (ret.length)
    return ret.reduce((val: number) => {
      return val;
    });

  return 0;
}
