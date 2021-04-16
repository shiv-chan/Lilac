class Character {
  constructor(props) {
    this._Name = props.name;
    this._HP = props.hp;
    this._initialHP = props.initialHP;
    this._MP = props.mp;
    this._initialMP = props.initialMP;
    this._offensePower = props.offensePower;
    this._defencePower = props.defencePower;
  }

  
  showStatus() {
    /* 
    キャラクターの名前、HP、MPを表示する。
    */
    const main = document.querySelector('#main');
    const div = document.createElement('div');
    div.innerHTML = `
    ==============================
    <ul style='list-style-type: none'>
      <li>Name: ${this._Name}</li>
      <li>HP: ${this._HP}</li>
      <li>MP: ${this._MP}</li>
    </ul>
    ==============================
    `
    main.append(div);
  }

  attack(defender) {
    /*
      キャラクターが死んでいる場合は攻撃出来ないので、それを表示する。
      死んでいない場合は相手に与えたダメージを表示。
      相手が死んだ場合は相手に与えたダメージと死んだことを表示する。 
    */
    const main = document.querySelector('#main');
    const div = document.createElement('div');

    if(this._HP === 0){
      div.innerHTML = `
      ==============================
      <p>${this._Name} is already dead!</p>
      ==============================
      `
      main.append(div);
      return;
    }

    if(defender._HP === 0){
      div.innerHTML = `
      ==============================
      <p>${defender._Name} is already dead!</p>
      ==============================
      `
      main.append(div);
      return;
    }
    
    let damage = this.calcAttackDamage(defender);
    //console.log(damage);
    defender._HP -= damage;

    if(defender._HP <= 0){
      div.innerHTML = `
      ==============================
      <p>${this._Name} gave ${damage} damage to ${defender._Name}.<br>${defender._Name} is now dead.</p>
      ==============================
      `
      main.append(div);
    } else {
      div.innerHTML = `
      ==============================
      <p>${this._Name} gave ${damage} damage to ${defender._Name}.</p>
      ==============================
      `
      main.append(div);
    }

  }

  calcAttackDamage(defender) {
    /*
      ダメージは単純に攻撃力から防御力を引いて計算する。
      ダメージが0未満の場合は、最低のダメージ1を与える。
    */

    let damage = this._offensePower - defender._defencePower;
    if(damage <= 0) damage = 1;
    return damage;
  }
}


  class Sorcerer extends Character {
    constructor(props) {
      super(props)
    }
    
    healSpell(target) {
      /* 
        回復魔法は3のMPを消費する。
        相手のHPを15回復する。
        魔法使いが死んでいる場合はその旨を表示する。
        相手が死んでいる場合は回復が出来ないためその旨を表示する。
        MPが足りない場合はその旨を表示する。
      */
      const main = document.querySelector('#main');
      const div = document.createElement('div');

      if(this._HP <= 0){
        div.innerHTML = `
        ==============================
        <p>${this._Name} is dead.</p>
        ==============================
        `
        main.append(div);
        return;
      }

      if(target._HP <= 0){
        div.innerHTML = `
        ==============================
        <p>${target._Name} is dead and no longer healed.</p>
        ==============================
        `
        main.append(div);
        return;
      }

      if(this._MP < 3){
        div.innerHTML = `
        ==============================
        <p>${this._Name}'s MP is not enough.</p>
        ==============================
        `
        main.append(div);
      } else {
        this._MP -= 3;
        target._HP += 15;
        div.innerHTML = `
          ==============================
          <p>${this._Name} healed ${target._Name}.<br>${target._Name} recovered 15HP!</p>
          ==============================
          `
        main.append(div);
      }
    }

    fireSpell(target) {
      /* 
        攻撃魔法は2のMPを消費する。
        相手に10のダメージを与える。
        魔法使いが死んでいる場合はその旨を表示する。
        相手が死んでいる場合は攻撃が出来ないためその旨を表示する。
        MPが足りない場合はその旨を表示する。
      */
        const main = document.querySelector('#main');
        const div = document.createElement('div');
  
        if(this._HP <= 0){
          div.innerHTML = `
          ==============================
          <p>${this._Name} is dead.</p>
          ==============================
          `
          main.append(div);
          return;
        }
  
        if(target._HP <= 0){
          div.innerHTML = `
          ==============================
          <p>${target._Name} is dead.</p>
          ==============================
          `
          main.append(div);
          return;
        }

        if(this._MP < 2){
          div.innerHTML = `
          ==============================
          <p>${this._Name}'s MP is not enough.</p>
          ==============================
          `
          main.append(div);
        } else {
          this._MP -= 2;
          target._HP -= 10;
          div.innerHTML = `
            ==============================
            <p>${this._Name} attacked ${target._Name} and gave 10 damage.</p>
            ==============================
            `
          main.append(div);
        }
    }
  }


{
  const fighter = new Character({
    name: 'FIGHTER',
    hp: 40,
    mp: 0,
    offensePower: 15,
    defencePower: 10
  })
  const sorcerer = new Sorcerer({
    name: 'SORCERER',
    hp: 25,
    mp: 10,
    offensePower: 8,
    defencePower: 10
  })
  const monster = new Character({
    name: 'MONSTER',
    hp: 60,
    mp: 0,
    offensePower: 30,
    defencePower: 10
  })

  fighter.attack(monster);
  sorcerer.attack(monster);
  monster.attack(sorcerer);
  fighter.attack(monster);
  sorcerer.healSpell(sorcerer);
  monster.attack(fighter);
  fighter.attack(monster);
  sorcerer.fireSpell(monster);
  monster.attack(fighter);
  fighter.showStatus();
  sorcerer.showStatus();
  monster.showStatus();
}