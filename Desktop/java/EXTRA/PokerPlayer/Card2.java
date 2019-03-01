public class Card2{
   public String suit;
   public int card; 
   public Card2(String suit,int card){
      this.suit = suit;
      this.card = card;
   }

   public String toString(){
      String card = this.card + " of "+ suit + "s";
      return card;
   }
   
   public boolean equals(Card cardOther){
      return (this.suit.equalsIgnoreCase(cardOther.suit)) && (this.card == cardOther.card);
   }
   
   
   

   
}