#!/bin/bash

# 遍历所有的.ts文件，但排除.d.ts文件
find . -name "*.ts" | grep -v "\.d\.ts$" | while read file; do
  # 检查文件是否已经包含export default {}
  if ! grep -q "export default {}" "$file"; then
    # 将export default {}添加到文件的开头
    temp_file=$(mktemp)
    echo "export default {};" > "$temp_file"
    cat "$file" >> "$temp_file"
    mv "$temp_file" "$file"
    echo "已添加 export default {} 到文件: $file"
  else
    echo "文件已有 export default {}: $file"
  fi
done 