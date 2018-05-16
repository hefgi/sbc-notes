var create_height = $('#HRCreateHeight');
var create_weight = $('#HRCreateWeight');
var create_problems = $('#HRCreateProblems');
var create_medications = $('#HRCreateMedications');
var create_allergies = $('#HRCreateAllergies');
var create_button = $('#createButton');

var search_address = $('#HRSearchAddress');
var search_button = $('#searchButton');
var search_result = $('#search-result');

var update_height = $('#HRUpdateHeight');
var update_weight = $('#HRUpdateWeight');
var update_problems = $('#HRUpdateProblems');
var update_medications = $('#HRUpdateMedications');
var update_allergies = $('#HRUpdateAllergies');
var update_button = $('#updateButton');

class HealthRecord {
  constructor(result) {
    this.height_cm = result[4].c[0];
    this.weight_kg = result[3].c[0];
    this.problems = result[0];
    this.medications = result[1];
    this.allergies = result[2];
  }

  isValid() {
    if (this.problems.length <= 50 
      && this.problems.length > 0
      && this.medications.length <= 50 
      && this.medications.length > 0
      && this.allergies.length <= 50 
      && this.allergies.length > 0
      && this.weight_kg > 0 
      && this.weight_kg <= 500 
      && this.height_cm > 0 
      && this.height_cm <= 300) {
      return true
    }
    return false
  }

  addHealthRecordToDOM(transactionsDiv) {
    //start a virtual form
    var form = $('<form>');

    //ugly code, could be way better but I don't have time to deal with jquery :x
    var div = $('<div>').addClass('form-group');
    var label = $('<label>').html('Height (cm)').addClass('control-label').attr('for', 'HRUpdateHeight');
    div.append(label);
    var input = $('<input>').val(this.height_cm.toString()).addClass('form-control').attr({'type': 'number', 'id': 'HRUpdateHeight'});
    div.append(input);
    form.append(div);

    var div = $('<div>').addClass('form-group');
    var label = $('<label>').html('Weight (kg)').addClass('control-label').attr('for', 'HRUpdateWeight');
    div.append(label);
    var input = $('<input>').val(this.weight_kg.toString()).addClass('form-control').attr({'type': 'number', 'id': 'HRUpdateWeight'});
    div.append(input);
    form.append(div);

    var div = $('<div>').addClass('form-group');
    var label = $('<label>').html('Problems').addClass('control-label').attr('for', 'HRUpdateProblems');
    div.append(label);
    var textarea = $('<textarea>').html(this.problems).addClass('form-control').attr({'row': '3', 'id': 'HRUpdateProblems'});
    div.append(textarea);
    form.append(div);

    var div = $('<div>').addClass('form-group');
    var label = $('<label>').html('Medications').addClass('control-label').attr('for', 'HRUpdateMedications');
    div.append(label);
    var textarea = $('<textarea>').html(this.medications).addClass('form-control').attr({'row': '3', 'id': 'HRUpdateMedications'});
    div.append(textarea);
    form.append(div);

    var div = $('<div>').addClass('form-group');
    var label = $('<label>').html('Allergies').addClass('control-label').attr('for', 'HRUpdateAllergies');
    div.append(label);
    var textarea = $('<textarea>').html(this.allergies).addClass('form-control').attr({'row': '3', 'id': 'HRUpdateAllergies'});
    div.append(textarea);
    form.append(div);

    //we add the form onto the html
    transactionsDiv.append(form);
  }
}

App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('HealthRecord.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var HealthRecordArtifact = data;
      App.contracts.HealthRecord = TruffleContract(HealthRecordArtifact);

      // Set the provider for our contract.
      App.contracts.HealthRecord.setProvider(App.web3Provider);

      // By default we set account in the search & Use our contract to retrieve the record.
      App.getAddress();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#createButton', App.createRecord);
    $(document).on('click', '#searchButton', App.getRecord);
    $(document).on('click', '#updateButton', App.updateRecord);
  },

  getAddress: function() {
    //By default we set account in the search
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      search_address.val(accounts[0]);

      //then retrieve the record
      App.getRecord();
    });
  },

  getRecord: function() {
    var healthRecordInstance;

    var account = search_address.val();

    App.contracts.HealthRecord.deployed().then(function(instance) {
      healthRecordInstance = instance;

      return healthRecordInstance.getRecord(account);
    }).then(function(result) {
      let record = new HealthRecord(result);
      search_result.html("");

      if (record.isValid()) {
        record.addHealthRecordToDOM(search_result);
      }
    }).catch(function(err) {

      console.log(err.message);
    });
  },

  createRecord: function(event) {
    event.preventDefault();

    var healthRecordInstance;

    App.contracts.HealthRecord.deployed().then(function(instance) {
      healthRecordInstance = instance;

      return healthRecordInstance.createRecord(create_problems.val(), create_medications.val(), create_allergies.val(), create_weight.val(), create_height.val());
    }).then(function(result) {
      alert('Creation Successful!');
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  updateRecord: function(event) {
    event.preventDefault();

    var healthRecordInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.HealthRecord.deployed().then(function(instance) {
        healthRecordInstance = instance;

        return healthRecordInstance.updateRecord(account, problems.val(), medications.val(), allergies.val(), weight_kg.val(), height_cm.val());
      }).then(function(result) {
        alert('Update Successful!');
        return App.getRecord();
      }).catch(function(err) {
        alert('Update failed. Not allowed to update record.');
        console.log(err.message);
      });
    });
  }
};

$(function() {
  $(window).on("load", function() {
    App.init();
  });
});
