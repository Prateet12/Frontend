public class Card{
   public String suit;
   public int card; 
   public Card next;
   public Card(String suit,int card){
      this(suit,card,null);     
   }

   public String toString(){
      String card = this.card + " of "+ suit + "s";
      return card;
   }
   
    // constructs a node with the given name and link
   public Card(String suit,int card, Card next) {
       this.suit = suit;
       this.card = card;
       this.next = next;
   }
   
   public boolean equals(Card cardOther){
      return (this.suit.equalsIgnoreCase(cardOther.suit)) && (this.card == cardOther.card);
   }
   
   
}