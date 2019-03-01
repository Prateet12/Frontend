// TO DO WORK
// work on comparing
// work hiding previous output 
// work on making multiple methods in simulator 
// work on exceptions and side cases 
// make indent method for beauty
import java.util.*;
public class PokerSimulator{
   public static void main(String[] args){
      int count = 0;
      List<Double> bank = new ArrayList<>();// stores bank data
      List<String> names = new ArrayList<>();// stores names of all players in game
      Scanner input = new Scanner(System.in);
      boolean done = startingTest(input);
      //public static void start()
      while(!done){
         System.out.print("   Enter name of player" + (count + 1));
         System.out.print(" (Press Q to quit): ");
         
         
         
         String name = input.next();
         if(!names.contains(name)){
            if(!name.equalsIgnoreCase("q")){
               count++;
               System.out.print("   Enter $ inital amount payed by player" + count + ": ");
               double bankAmount = input.nextDouble();
               if(bankAmount != 0){
                  bank.add(bankAmount);
                  names.add(name/*.toLowerCase()*/);
                  System.out.println();
               }else{
                  count--;
                  System.out.println("Enter valid amount");
               }
               
            }else{
               done = true;
            }
         }else{
            System.out.println("Can't have two same names, enter different name");
         }
       }
       
       PokerManager pm = new PokerManager(count,bank,names);
       
       done = false;
       //public static void make initial hand
       int playerNumber = 1;
        
       for(int i = 0; i < 1 ;i++){
         for(String name: names){
            pm.makeInitialHand(name); 
         }
       }
       // public static void play game
       int roundNumber = 1;
       while(roundNumber < 5){
           if(roundNumber == 2){
              pm.showFlop();
           }else if( roundNumber > 2){
              pm.showNext();
           }
           Iterator<String> itr = names.iterator();
           double callAmount = 0;
           while(itr.hasNext()){
              String name = itr.next();
              pm.showCurrentHand(name);
              if(callAmount != 0){
                 System.out.println("Current call amount is: $" + callAmount);
              }
              String move = pm.askMove(input,name);
              if(!(move.equals("call")|| move.equals("raise")|| move.equals("check")|| move.equals("fold"))){
                  System.out.println("Not a valid move");
                  move = pm.askMove(input,name);
              }if(move.equals("call") || move.equals("raise")){
              
                 System.out.println("Enter amount: ");
                 callAmount = input.nextDouble();
                 if(pm.getBank(name) > callAmount){
                    pm.changeBank(name,-callAmount); 
                    pm.addToPot(callAmount);  
                 }else{// if not enough money to raise 
                   System.out.println("Do you wish to go all in? Enter yes to do so, else enter anything");
                   String call = input.next();
                   if(call.equals("yes")){
                     pm.makeSidePot();
                     pm.addToPot(pm.getBank(name)); 
                     pm.changeBank(name,pm.getBank(name));// decreasing to 0
                   }else{
                     itr.remove();// removed from consecutive rounds
                     pm.removePlayer();// removed from count need to check
                   }
                 }
                          
              }else if(move.equals("fold")){
                    itr.remove();
                    pm.removePlayer();
              }
    
           }
           
           
           roundNumber++;
       }
        
      
      

   }
   
   public static boolean startingTest(Scanner input){
      System.out.println("Welcome to the Poker Simulators");
      boolean done = false;
      System.out.print("   Press enter to quit, anything else to play: ");
      String responseToGame = input.nextLine();
      if(responseToGame.length() == 0){
         done = true;
      }
      
      return done;
   }
   
   public static void setupGame(boolean done, Scanner input, int count, List<String> names,List<Double> bank){
      while(!done){
         System.out.print("   Enter name of player" + (count + 1));
         System.out.print(" (Press Q to quit): ");
      
         String name = input.next();
         if(!names.contains(name)){
            if(!name.equalsIgnoreCase("q")){
               count++;
               System.out.print("   Enter $ inital amount payed by player" + count + ": ");
               double bankAmount = input.nextDouble();
               boolean ok = updateBank(bankAmount);
               if(!ok){
                  System.out.print("   Enter $ inital amount payed by player" + count + ": ");
                  bankAmount = input.nextDouble();
                  updateBank(bankAmount);
               }
            }else{
               done = true;
            }
         }else{
            System.out.println("Can't have two same names, enter different name");
         }
      }
   }
   
   public static boolean updateBank(double bankAmount){
      if(bankAmount > 0){
         bank.add(bankAmount);
         names.add(name.toLowerCase());
         System.out.println();
         return true;
      }else{
         System.out.println("Enter valid amount");
         return false;
      }

   }
}