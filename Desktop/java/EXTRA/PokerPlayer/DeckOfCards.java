
// Currently knowledge of how to make data structure from scratch is limited to linked list
import java.util.*;

public class DeckOfCards{
   private List<String> suits;
   private Card deck;
   private int size;
   private Card lastCard;
   public DeckOfCards(){
      suits = new ArrayList<>();
      suits.add("Spade");
      suits.add("Club");
      suits.add("Heart");
      suits.add("Diamond");
      
      for(int i = 0; i < suits.size();i++){
         for(int j = 1;j <= 2;j++){// change back
            deck = new Card(suits.get(i),j,deck);
         }
      }
      
      size = 8;
      
      Card currentCard = deck;
      while(currentCard.next != null){
         currentCard = currentCard.next;
      }
      
      lastCard = currentCard;
   }

   
   // prints currentDeck
   public void printDeck(){
      Card current = deck;
      while(current != null){
         System.out.println(current);
         current = current.next;
      }  
   }
   
   // removes specified card
   public Card remove(Card cardCheck){
      if(!contains(cardCheck)){
         throw new IllegalArgumentException();
      }
      size--;
      Card currentCard = deck;
      if(currentCard.equals(cardCheck)){
         Card removed = deck;
         deck = deck.next;
         return removed;
      }else{
         while(!currentCard.next.equals(cardCheck)){
            currentCard = currentCard.next;
         }
         
         Card removed = currentCard.next;
         currentCard.next = currentCard.next.next;
         
         return removed;
      }
   }
   // removes card at given index 
   public Card removeCardAt(int index){
      if(index >= size){
         throw new IllegalArgumentException();
      }
      size--;
      Card currentCard = deck;
      int count = 0;
      if(count == index){
         Card removed = deck;
         deck = deck.next;
         return removed;
      }else{
         while(count != index){
            currentCard = currentCard.next;
            count++;
         }
         
         Card removed = currentCard.next;
         currentCard.next = currentCard.next.next;
         
         return removed;
      }
   }
   
   public int indexOf(Card cardCheck){
      if(!contains(cardCheck)){
         throw new IllegalArgumentException();
      }
      
      int index = 0;
      Card currentCard = deck;
      if(currentCard.equals(cardCheck)){
         return index;
      }else{
         while(!currentCard.equals(cardCheck)){
            currentCard = currentCard.next;
            index++;
         }
         
         
         return index;
      }
   }
   
   public Card cardAt(int index){
      /*if(index >= size){
         throw new IllegalArgumentException();
      }*/
      
      Card currentCard = deck;
      for(int i = 0; i <= index;i++){
         currentCard = currentCard.next;
      }
      
      return currentCard;
      
   }
   
   
   public boolean isEmpty(){
      return size == 0;
   }
   
   public boolean contains(Card card){
      Card currentCard = deck;
      while(currentCard != null){
         if(currentCard.equals(card)){
            return true;           
         }
         
         currentCard = currentCard.next;   
      }
      
      return false;
   }
   
   
   
   public void shuffleDeck() {
        int n = 8;
        Random random = new Random();
        //random.nextInt();
        for (int i = 1; i < n; i++) {
            int change = i + random.nextInt(n - i);
            swap(i, change);
        }
    }

   public void insertAt(int index, Card card){
      if(index == 0){
         deck = new Card(card.suit,card.card,deck);
      }else{
         Card currentCard = deck;
         int currIndex = 0;
         while(currentCard.next != null && currIndex < index){
            currentCard = currentCard.next;
         }
         
         currentCard.next = new Card(card.suit,card.card,currentCard.next);
      }
   }
   
   public void swap(int i, int change) {
       Card card1 = removeCardAt(i);
       Card card2 = removeCardAt(change);
       insertAt(i,card1);
       insertAt(change,card2);
        
        /*
        a.set(i, a.get(change));
        a.set(change, helper);*/
   }
   
   
   // try making it a collection and use .shuffle method
   
   
   public void shuffle(int n){// shuffle deck
      Random r = new Random();
      for(int i = 0; i < n;i++){
         //if int startPount = 13 + r.nextInt(12); dont want to shuffle from top or just a few cards 
         
         int shufflePoint =  r.nextInt(8);
         if(shufflePoint != 0){
            Card deckNew = cardAt(shufflePoint);
            Card newDeckEnd = cardAt(shufflePoint - 1);
            lastCard.next = deck;
            newDeckEnd.next = null;
            lastCard = newDeckEnd;
            deck = deckNew;
         }
          
         //for(int j = 0;i < size;i++){
         
         //}
         //shuffleDeck();
      }  
      
   }
}