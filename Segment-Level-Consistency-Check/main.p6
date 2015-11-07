my @sArr = "cat", "dog", "dog", "dog", "dog", "fish", "monkey", "monkey", "chair", "stool";
my @tArr = "katt", "hund", "bikkje", "sjefer", "puddel", "fish", "ape", "apekatt", "stol", "stol";
my %hash;

sub find_incon (@arr1, @arr2) {
   my %hash;
   # Find inconsistent translations in source/target or target/source
   loop (my $i=0;$i < @arr1.elems; $i++){
      loop (my $j=0;$j < @arr1.elems; $j++){
         # not same item && strlen same && identical text content
         if ($i != $j) && (@arr1[$i].chars == @arr1[$j].chars) && (@arr1[$i] eq @arr1[$j]) {
            if @arr2[$i] ne @arr2[$j] {
               if $i <= $j {
                  say "@arr2[$i] (index $i) is different from @arr2[$j] (index $j)";
                  %hash{$i} = $j;
               }
            }
         }
      }
   } 
   my @outArr;
   # Extract related key pairs
   say %hash.perl;
   for keys %hash -> $key1 {
      for keys %hash -> $key2 {
         if %hash{$key1} == %hash{$key2} && $key1 ne $key2 {
            my $tmpStr = $key1 ~ $key2 ~ %hash{$key1} ~ %hash{$key2};
            $tmpStr = $tmpStr.split("").unique.join("");
            @outArr.push($tmpStr);
            %hash{$key1}:delete;
            %hash{$key2}:delete;
         }
      }
   }
   # Extract remaining unrelated key pairs
   for keys %hash -> $key1 {
      @outArr.push($key1 ~ %hash{$key1});
   }
   # "Indexes $_ in sArr are inconsistent with source equivalent".say for @outArr;
   for 0 ..^ @outArr.elems -> $i {
      @outArr[$i] = @outArr[$i].split("");
   }
   return @outArr;
}

my @target_incon = find_incon(@sArr, @tArr);
"Indexes $_ in tArr are inconsistent with source equivalent".say for @target_incon;
say @target_incon.perl;
say "\n";
my @source_incon = find_incon(@tArr, @sArr);
"Indexes $_ in sArr are inconsistent with target equivalent".say for @source_incon;
say @source_incon.perl;
