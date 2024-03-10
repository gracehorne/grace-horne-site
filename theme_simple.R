library(extrafont)
library(ggthemes)
library(ggtext)

# run below line if you encounter grid.Call errors
# extrafont::font_import()




theme_simple <- function() {
  font <- "Avenir"      # assign font family
  
  theme_excel_new() %+replace%
    
    theme(
      # get rid of grid
      panel.grid.major = element_blank(),
      
      # make extra space
      plot.margin = unit(c(0.5, 1, 0.5, 0.5), "cm"),
      
      # set font family and color
      text = element_text(color = "black",
                          family = font),
      
      # titles
      plot.title = element_markdown(
        size = 12,
        hjust = 0,
        vjust = 2
      ),
      plot.subtitle = element_text(
        size = 12),
      plot.caption = element_text(
        size = 12,                
        hjust = 1),
      axis.title.x = element_markdown(
        size = 12),
      axis.title.y = element_markdown(
        size = 12,
        angle = 90,
        hjust = 0.5
      ),
      
      # axis text
      axis.text = element_text(
        size = 12),
      axis.text.x = element_text(margin = ggplot2::margin(b = 10, t = 5)),
      axis.text.y = element_text(hjust = 1, margin = ggplot2::margin(l = 5, r = 5)),
      
      # legend
      legend.text = element_text(color = "black", size = 10),
      legend.position = "bottom",
      panel.border = element_rect(
        colour = "black",
        fill = NA,
        linewidth = 1,
        linetype = 1
      ),
      
      # axis ticks
      axis.ticks.length = unit(.1, units = "cm"),
      axis.ticks = element_line(color = "black")
    )
}
