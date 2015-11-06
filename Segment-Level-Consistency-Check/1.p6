my @sArr = "cat", "dog", "dog", "dog", "fish", "monkey", "monkey", "chair", "stool";
my @tArr = "katt", "hund", "bikkje", "sjefer", "fish", "ape", "apekatt", "stol", "stol";
my %hash;

# Source incon
loop (my $i=0;$i < @sArr.elems; $i++){
    loop (my $j=0;$j < @sArr.elems; $j++){
       # not same item && strlen same && identical text content
       if ($i != $j) && (@sArr[$i].chars == @sArr[$j].chars) && (@sArr[$i] eq @sArr[$j]) {
           if @tArr[$i] ne @tArr[$j] {
               if $i <= $j {
               say "@tArr[$i] (index $i) is different from @tArr[$j] (index $j)";
                %hash{$i} = $j;
               }
           }
       }
    }
}
say "";
.say for @sArr;
say "";
.say for @tArr;
say "\nTarget array indexes that are inconsistent (equal source)";
.say for %hash;

my @dupArr;
my $tmpStr;
for keys %hash -> $key1 {
   @tmpArr = "";
   for keys %hash -> $key2 {
      @tmparr ~= $key1;
   }
   say @tmpArr;
}
