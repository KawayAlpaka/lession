pragma solidity >=0.4.22 <0.6.0;
contract Counter{
    int num;
    constructor () public {
        num = 0;
    }
    function increase () public payable {
        num++;
    }
    function getNum () public view returns (int) {
        return num;
    }
}