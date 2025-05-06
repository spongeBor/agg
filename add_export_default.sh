#!/bin/bash

# 检查是否提供了--file参数
if [[ "$1" == "--file" ]]; then
  # 参数模式：处理从lint-staged传入的文件
  shift # 移除--file参数
  
  # 处理所有传入的文件参数
  for file in "$@"; do
    # 跳过.d.ts文件
    if [[ $file == *.d.ts ]]; then
      echo "跳过 .d.ts 文件: $file"
      continue
    fi
    
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
else
  # 原始模式：遍历所有.ts文件
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
fi 