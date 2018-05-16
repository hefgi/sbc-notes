pragma solidity ^0.4.18;

contract HealthRecord {
	struct Record {
		//problems, medications, allergies, weight, height
		string problems;
		string medications;
		string allergies;
		uint16 weight_kg;
		uint16 height_cm;
	}

	mapping (address => Record) records;

	function createRecord(string _problems, string _medications, string _allergies, uint16 _weight_kg, uint16 _height_cm) external {
		require( (bytes(_problems).length <= 50) && (bytes(_medications).length <= 50) && (bytes(_allergies).length <= 50));
		require( _weight_kg > 0 && _weight_kg <= 500 && _height_cm > 0 && _height_cm <= 300);

		records[msg.sender] = Record(_problems, _medications, _allergies, _weight_kg, _height_cm);
	}

	function getRecord(address _address) view external returns (string _problems, string _medications, string _allergies, uint16 _weight_kg, uint16 _height_cm) {
		Record memory rec = records[_address];

		return (rec.problems, rec.medications, rec.allergies, rec.weight_kg, rec.height_cm);
	}

	function updateRecord(address _address, string _problems, string _medications, string _allergies, uint16 _weight_kg, uint16 _height_cm) external {
		require (msg.sender == _address);

		Record storage rec = records[_address];
		rec.problems = _problems;
		rec.medications = _medications;
		rec.allergies = _allergies;
		rec.weight_kg = _weight_kg;
		rec.height_cm = _height_cm;
	}
}