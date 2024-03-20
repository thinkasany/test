echo  "@antd" | sed 's/@/*/1'
release_name=$(echo "@antd" | sed 's/@/*/g');
echo $release_name;