import pandas as pd
import numpy as np

# csv file path
homeownership_csv = "Resources/Homeownership_Rate_by_State_Pcnt.csv"
bachelor_degree_csv = "Resources/Bachelors_Degree_or_Higher_by_State_Percent.csv"
hs_grad_csv = "Resources/High_School_Graduate_or_Higher_by_State_Percent.csv"
median_hh_income_csv = "Resources/Median_Household_Income_by_State_Current_Dollars.csv"
per_capita_income_csv = "Resources/Per_Capita_Personal_Income_by_State_Dollars.csv"
ttl_gdp_by_state_csv = "Resources/Total_Gross_Domestic_Product_by_State_Millions_of_Dollars.csv"

# Import the csv files into their respective dataframes
homeownership_df = pd.read_csv(homeownership_csv, encoding="utf-8")
bachelor_degree_df = pd.read_csv(bachelor_degree_csv, encoding="utf-8")
hs_grad_df = pd.read_csv(hs_grad_csv, encoding="utf-8")
median_hh_income_df = pd.read_csv(median_hh_income_csv, encoding="utf-8")
per_capita_income_df = pd.read_csv(per_capita_income_csv, encoding="utf-8")
ttl_gdp_by_state_df = pd.read_csv(ttl_gdp_by_state_csv, encoding="utf-8")

# set indexes to the state name
homeownership_df.set_index("Region Name", inplace = True)
bachelor_degree_df.set_index("Region Name", inplace = True)
hs_grad_df.set_index("Region Name", inplace = True)
median_hh_income_df.set_index("Region Name", inplace = True)
per_capita_income_df.set_index("Region Name", inplace = True)
ttl_gdp_by_state_df.set_index("Region Name", inplace = True)

state_metrics_list = []

year_range = np.arange(2006,2020)

#####################################################################  
# loop through the range of years
#####################################################################  

def load_state_metrics():
    for i in year_range:
        
        year = str(i)
        
        try:
            homeownership = homeownership_df[year]
        except:
            homeownership = pd.Series(np.NaN)
        try:   
            bachelor_degree = bachelor_degree_df[year]    
        except:
            bachelor_degree = pd.Series(np.NaN)
        try: 
            hs_grad = hs_grad_df[year]
        except:
            hs_grad = pd.Series(np.NaN)
        try: 
            median_hh_income = median_hh_income_df[year]
        except:
            median_hh_income = pd.Series(np.NaN)
        try: 
            per_capita_income = per_capita_income_df[year]
        except:
            per_capita_income = pd.Series(np.NaN)
        try: 
            ttl_gdp_by_state = ttl_gdp_by_state_df[year]
        except:
            ttl_gdp_by_state = pd.Series(np.NaN)

    
        # loop throught the homeownership series and set the state,year, homeownership rate values        
        for items in homeownership.iteritems(): 
            
                state_by_year_dict = {}

                state = items[0]
                
                state_by_year_dict['state'] = state
                state_by_year_dict['year'] = year
                state_by_year_dict['homeownership_rate'] = items[1]        
                
                # loop thru bachelor_degree and set the bachelor degree pcnt value              
                for items in bachelor_degree.iteritems():  
                    if items[0] == state:
                        state_by_year_dict['bachelor_degree_pcnt'] = items[1]
                    else:
                        continue
                    
                # loop thru hs_grad and set the high school grad pcnt value
                for items in hs_grad.iteritems():  
                    if items[0] == state:
                        state_by_year_dict['high_school_grad_pcnt'] = items[1]
                    else:
                        continue
                        
                # loop through median_hh_income and set the median hh income value
                for items in median_hh_income.iteritems():  
                    if items[0] == state:
                        state_by_year_dict['median_hh_income'] = items[1]
                    else:
                        continue
                            
                # loop through per_capita_income and set the per captia personal income value
                for items in per_capita_income.iteritems():  
                    if items[0] == state:
                        state_by_year_dict['per_captia_personal_income'] = items[1]
                    else:
                        continue
                            
                # loop through ttl_gdp_by_state and set the ttl gdp by state value
                for items in ttl_gdp_by_state.iteritems():  
                    if items[0] == state:
                        state_by_year_dict['ttl_gdp_by_state'] = items[1]
                    else:
                        continue

                state_metrics_list.append(state_by_year_dict)
        
                    
    return state_metrics_list

