my @sArr = "cat", "dog", "dog", "dog", "fish", "monkey", "monkey", "chair", "stool";
my @tArr = "katt", "hund", "bikkje", "sjefer", "fish", "ape", "apekatt", "stol", "stol";
my %hash;

# Find source incon
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
} # Output: 1 => 3, 2 => 3, 5 => 6
say "";
.say for @sArr;
say "";
.say for @tArr;
say "\nTarget array indexes that are inconsistent (equal source)";
.say for %hash;

# TODO:

#1. loop hash twice
#2. if values are equal for both loops, and if key names are not identical:
#3.      push array of all unique values and keys to array
#4. when above looping is done:
#        push array of the value and the key to array

my @outArr;

# Extract related key pairs
for keys %hash -> $key1 {
   for keys %hash -> $key2 {
      if %hash{$key1} ~~ %hash{$key2} && $key1 !~~ $key2 {
         my $tmpStr = $key1 ~ $key2 ~ %hash{$key1} ~ %hash{$key2};
         @outArr.push($tmpStr.split("").unique);
         %hash{$key1}:delete;
         %hash{$key2}:delete;
      }
   }
}

# Extract remaining unrelated key pairs
for keys %hash -> $key1 {
   @outArr.push($key1 ~ %hash{$key1});
}
"Indexes $_ in sArr are inconsistent with source equivalent".say for @outArr;
