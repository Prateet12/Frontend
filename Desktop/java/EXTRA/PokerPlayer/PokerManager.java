import java.util.*;
public class PokerManager{
   
   private Map<String,Queue<Card2>> playerHands;// keeps track of player's hand
   private DeckOfCards2 makeDeck;// deck being used 
   private Queue<Card2> deck;
   private int playersLeft;
   private double potAmount;
   private final int INITIAL_CARD_COUNT = 2;// cards given at start 
   private Map<String,Double> bankTrack;// tracks money 
   public PokerManager(int players,List<Double> initialBank, List<String> names){
      makeDeck = new DeckOfCards2();
      makeDeck.shuffle();
      deck = makeDeck.getDeck();
      potAmount = 0;
      playersLeft = players;
      playerHands = new HashMap<>();
      bankTrack = new HashMap<>();
      // starts game by giving each player 2 cards
      // can make method 
      for(int j = 0; j < INITIAL_CARD_COUNT;j++){
         for(int i = 0; i < players;i++){
            if(!playerHands.containsKey(i)){
               playerHands.put(names.get(i),new LinkedList<Card2>());
            }
            String name = names.get(i);
            playerHands.get(name).add(giveCard());
         }
      }  
      
      for(int i = 0; i < players;i++){
         bankTrack.put(names.get(i),initialBank.get(i));
      }
         
   }
   // gives card to a player 
   public Card2 giveCard(){
      if(deck.isEmpty()){
         throw new IllegalStateException();
      }
      return deck.remove();
   }
   
   public void makeInitialHand(String playerName){
      playerHands.get(playerName).add(deck.remove());
   }
   
   public void showFlop(){
      if(deck.isEmpty()){
         throw new IllegalStateException();
      }
      Queue<Card2> flop = new LinkedList<>();
      flop.add(deck.remove());
      flop.add(deck.remove());
      flop.add(deck.remove());
      
      System.out.println(flop);
   }
   
   public void showNext(){
      if(deck.isEmpty()){
         throw new IllegalStateException();
      }
      System.out.println(deck.remove());
      
   }
   
   public double addToPot(double amount){
      potAmount += amount;
      return potAmount;
   }
   
   public boolean potIsEmpty(){
      return potAmount == 0.0;
   }
   
   public String askMove(Scanner input, String name){
     
     System.out.print("Call or Raise or Fold ");
     if(potIsEmpty()){
        System.out.print("or Check ");
     }
     System.out.println("@ " + name);
     String move = input.next();
     move = move.toLowerCase();
     
     return move;
   }
   
   public double getBank(String name){
      if(bankTrack.containsKey(name)){
         return bankTrack.get(name);
      }
      
      return -1.0;
   }
   
   public void changeBank(String name, double amount){
      double bank = bankTrack.get(name) + amount;
      bankTrack.put(name,bank);
   }
   
   public void makeSidePot(){
   
   }
   
   public boolean GameOver(int players){
      return players == 0;
   }
   
   public void removePlayer(){
      playersLeft --;
   }
   
   public void showCurrentHand(String name){
      System.out.println(playerHands.get(name));
   }
   
   public void makeBestHand(){
   
   }
   /*
   
   public showGame
   
   
   
   public winner
   
   
   
   public moneyLeft
   
   public int playersLeft
   
   public suggestion// calc winning odds with current but cost money and also tell others that one took suggestion- showed to everyone 
   
   public showhand
   
   public isMoofless// at any point in game dealer can call game moofless making the worst hand the best one 
   
   // think AI suggesting to play more or not
   // for positive use ??  
*/
   
}