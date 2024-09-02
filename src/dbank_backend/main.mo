import Time "mo:base/Time";
import Float "mo:base/Float";


actor dBank{
  stable var current:Float = 0;
  // current:= 0;
  stable var startTime = Time.now();
  // startTime:= Time.now();

  public func topUp(amount: Float) {
    current += amount;
  };

  public func topDown(amount : Float){
    let diff: Float = current - amount;
    if(diff >= 0){
      current -= amount;
    }
  };

  public query func balance(): async Float{
    return current;
  };

  public func compound() {
    let currentTime = Time.now();
    var passedTime = currentTime - startTime;
    passedTime:= passedTime / 1000000000;
    current:= current * (1.01**Float.fromInt(passedTime));
    startTime := currentTime;
  };

};