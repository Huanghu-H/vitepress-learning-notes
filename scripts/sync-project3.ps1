$ErrorActionPreference = 'Stop'

$project4Root = Split-Path -Parent $PSScriptRoot
$project3Root = Join-Path (Split-Path -Parent $project4Root) 'project_03_vitepress_docs'
$sourceDocs = Join-Path $project3Root 'docs'
$destinationDocs = Join-Path $project4Root 'docs'

if (-not (Test-Path -LiteralPath $sourceDocs)) {
    throw "未找到项目三文档目录：$sourceDocs"
}

$contentItems = @('index.md', 'about.md', 'guide', 'notes', 'tools')
foreach ($item in $contentItems) {
    $source = Join-Path $sourceDocs $item
    if (Test-Path -LiteralPath $source) {
        Copy-Item -LiteralPath $source -Destination $destinationDocs -Recurse -Force
    }
}

$sourceTheme = Join-Path $sourceDocs '.vitepress\theme'
$destinationVitePress = Join-Path $destinationDocs '.vitepress'
if (Test-Path -LiteralPath $sourceTheme) {
    Copy-Item -LiteralPath $sourceTheme -Destination $destinationVitePress -Recurse -Force
}

Write-Host '项目三的 Markdown 内容和主题已同步。项目四的 Pages 专用 config.mts 保持不变。'
