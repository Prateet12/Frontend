// Currently knowledge of how to make data structure from scratch is limited to linked list
import java.util.*;
public class DeckOfCards2{
   private List<String> suits;
   private Queue<Card2> deck;
   private int size;
   public DeckOfCards2(){
      suits = new ArrayList<>();
      suits.add("Spade");
      suits.add("Club");
      suits.add("Heart");
      suits.add("Diamond");
     
      deck = new LinkedList<>();
      for(int i = 0; i < suits.size();i++){
         for(int j = 1;j <= 13;j++){// change back
            deck.add(new Card2(suits.get(i),j));
         }
      }
      
      size = 52;
   }
   
   // prints currentDeck
   public void printDeck(){
      System.out.println(deck);
   }
   
   public int size(){
      return size;
   }
   
   public void shuffle(){
      List<Card2> list = new ArrayList<>();
      
      for(int i = 0; i < size; i++){
         Card2 c = deck.remove();
         list.add(c);
      }
      
      Collections.shuffle(list);
      
      for(int i = 0; i < size; i++){
         deck.add(list.get(i));
      }
      
   }
   
   public Queue<Card2> getDeck(){
      return deck;
   }
  //  
//    public isHighCard
//    public isOnePair 
//    public isTwoPair
//    public isThreeOfAKind
}